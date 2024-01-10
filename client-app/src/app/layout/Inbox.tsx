import { Feed } from 'semantic-ui-react';

const Inbox = () => {
  return (
    <Feed>
      {/* Example Message */}
      <Feed.Event>
        {/* <Feed.Label image="/avatar.jpg" /> */}
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>John Doe</Feed.User> sent you a message
            <Feed.Date>1 hour ago</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            Hey, how are you doing?
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>

      {/* Add more messages as needed */}
    </Feed>
  );
};

export default Inbox;