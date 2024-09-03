exports.userDashboard = (req, res) => {
    res.status(200).json({
        message: 'Welcome to the user dashboard!',
        user: req.user // This will include the user information from the JWT
    });
};

exports.tailorDashboard = (req, res) => {
    res.status(200).json({
        message: 'Welcome to the tailor dashboard!',
        user: req.user
    });
};

exports.vendorDashboard = (req, res) => {
    res.status(200).json({
        message: 'Welcome to the vendor dashboard!',
        user: req.user
    });
};
