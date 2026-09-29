
import User from "./userModel.js";
import Post from "./postModel.js";


User.hasMany(Post, {
    foreignKey: "userId"
});


Post.belongsTo(User, {
    foreignKey: "userId"
});


export {
    User,
    Post
};