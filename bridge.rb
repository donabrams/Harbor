require 'em-websocket'


EventMachine.run {
  @channel = EM::Channel.new

  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080, :debug => true) do |ws|
    ws.onopen    { 
      sid = @channel.subscribe { |msg| ws.send msg }
      ws.onclose   { 
        @channel.unsubscribe(sid);
        puts "WebSocket closed" 
      }
    }
    ws.onmessage {  |msg|
      ws.close if msg == "close"
      @channel.push "#{msg}"
    }
    ws.onerror   { |e| puts "Error: #{e.message}" }
    puts "Server started"
  end
}