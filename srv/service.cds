using { events as e } from '../db/schema';

service EventService {
  entity Producers as projection on e.Producer;
  entity Consumers as projection on e.Consumer;
  entity Events as projection on e.Event;
  entity EventTopics as projection on e.EventTopic;
  entity InvalidEvents as projection on e.InvalidEvent;
}
