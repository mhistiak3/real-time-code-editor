import Avatar from "react-avatar";

const User = ({ username }) => {
  return (
    <li >
      <Avatar name={username} size="40" round="5px" textSizeRatio={2.2} />
      <span>{username}</span>
    </li>
  );
};
export default User;
