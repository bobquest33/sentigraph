contract Sentigraph {
	struct Graphdata {
		string data;
		uint8 date;
		uint8 distance;
	}

	mapping (bytes32 => Graphdata) public records;

	function Sentigraph() {
	}

	function addRecord(bytes32 d, string r, uint8 da, uint8 q) {
		records[d] = Graphdata({
			data : r,
			date : da,
			distance : q
		});
	}

	function searchRecords(bytes32 d) constant returns (string, uint8,uint8) {
		if (records[d].distance > 0) {
			return (records[d].data, records[d].date, records[d].distance);
		} else {
			return ("0", 0, 0);
		}
	}
}
