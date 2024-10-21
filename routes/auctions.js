const Bid = require('../models/Bid');

// Place a Bid
router.post('/:id/bids', async (req, res) => {
  const auctionId = req.params.id;
  const { userId, amount } = req.body;

  // Find the auction
  const auction = await Auction.findById(auctionId);
  if (!auction) return res.status(404).send('Auction not found');

  // Check if the bid is higher than the current highest bid
  const highestBid = await Bid.findOne({ auction: auctionId }).sort({ amount: -1 });
  if (highestBid && amount <= highestBid.amount) {
    return res.status(400).send('Bid must be higher than the current highest bid');
  }

  // Create and save the new bid
  const bid = new Bid({ auction: auctionId, user: userId, amount });
  await bid.save();
  res.status(201).send(bid);
});

// Get Bids for an Auction
router.get('/:id/bids', async (req, res) => {
  const bids = await Bid.find({ auction: req.params.id }).populate('user', 'username');
  res.status(200).send(bids);
});

// After saving the bid
const outbidUsers = await Bid.find({ auction: auctionId }).sort({ amount: -1 }).skip(1); // Skip the highest bid
for (const outbid of outbidUsers) {
  const user = await User.findById(outbid.user);
  if (user) {
    user.notifications.push(`You have been outbid on auction item: ${auction.title}`);
    await user.save();
  }
}
