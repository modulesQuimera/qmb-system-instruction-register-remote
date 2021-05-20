module.exports = function(RED) {

	function register_remoteNode(config) {
		RED.nodes.createNode(this,config);
		this.source_value = config.source_value;
        this.time_sleep = config.time_sleep;
        
		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "register_remote",
                payload: {
                    attributes: [
                        { name: "source_value", value: parseInt(node.source_value) },
                        { name: "time_sleep", value: parseInt(node.time_sleep) }
                    ],
                }
            };
       
            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			node.send(msg);
		});
	}
	RED.nodes.registerType("register_remote", register_remoteNode);
}