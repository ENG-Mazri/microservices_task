import kafka from 'node-rdkafka'

const consumer = kafka.KafkaConsumer({
    'group.id': 'kafka',
    'metadata.broker.list':'localhost:9092'},
    {})
consumer.connect()

consumer.on('ready', ()=>{
    consumer.subscribe(['email'])
    consumer.consume()
}).on('data', data=>{
    console.log(data.value.toString())
})