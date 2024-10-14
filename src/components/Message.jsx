const Message = ({message}) => {
  return (
    <div className="message">
      <b>{message.sender}: </b>
      <span>{message.message}</span>
    </div>
  );
}
export default Message