namespace events;

entity BaseModel {
  key ID: Integer;
  name: String;
}

entity Producer: BaseModel {
  consumers: Association to many Consumer;
}

entity Consumer: BaseModel {
  event_topics: Association to many EventTopic;
  invalid_events: Association to many InvalidEvent;
  producer_id: Association to Producer;
}

entity EventTopic: BaseModel {
  event_topic_id: Integer;
  event_topic_name: String;
  events: Association to many Event;
  consumer_lag: Integer;
}

entity Event: BaseModel {
  event_topic_id: Association to EventTopic;
}

entity InvalidEvent {
  key ID: Integer;
  description: String;
  producer: Association to Producer;
  consumer: Association to Consumer;
}
