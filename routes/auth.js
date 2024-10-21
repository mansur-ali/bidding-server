// Get user by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    res.status(200).send(user);
  });
  
  // Update user information
  router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(user);
  });
  