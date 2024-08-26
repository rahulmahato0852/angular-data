exports.getUser = (req, res) => {
    res.status(200).json({ message: "User fetch success", users: ["ram", "sham"] })
}