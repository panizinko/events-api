namespace events;

entity BaseModel {
  key ID: Integer;
  name: String;
}

entity Producer: BaseModel {
  consumers: Association to many Consumer on consumers.producer_id = $self;
}

entity Consumer: BaseModel {
  event_topics: Association to many EventTopic on event_topics.consumer = $self;
  invalid_events: Association to many InvalidEvent on invalid_events.consumer = $self;
  producer_id: Association to Producer;
}

entity EventTopic: BaseModel {
  event_topic_id: Integer;
  event_topic_name: String;
  events: Association to many Event on events.event_topic_id = $self;
  consumer_lag: Integer;
  consumer: Association to Consumer;
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
