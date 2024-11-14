using { events as e } from '../db/schema';

service EventService {
  @readonly entity Producers as projection on e.Producer;
  @readonly entity Consumers as projection on e.Consumer;
  @readonly entity Events as projection on e.Event;
  @readonly entity EventTopics as projection on e.EventTopic;
  @readonly entity InvalidEvents as projection on e.InvalidEvent;
}