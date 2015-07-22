var ENV = {
	rows:100,
	timeout: 0
};

function getTopFiveQueries(db) {
  var arr = db.samples[db.samples.length - 1].queries.slice(0, 5);
  while (arr.length < 5) {
    arr.push({ query: 'blah', elapsed: Math.random() * 15 });
  }
  return arr;
}

function getData() {
  // generate some dummy data

  var data = {
    start_at: new Date().getTime() / 1000,
    databases: {}
  };

  for (var i = 1; i <= ENV.rows; i++) {
    data.databases["cluster" + i] = {
      queries: []
    };

    data.databases["cluster" + i + "slave"] = {
      queries: []
    };
  }

  var data2 = [];

  Object.keys(data.databases).forEach(function(dbname) {
    var info = data.databases[dbname];


    var r = Math.floor((Math.random() * 10) + 1);
    for (var i = 0; i < r; i++) {
      var q = {
        canvas_action: null,
        canvas_context_id: null,
        canvas_controller: null,
        canvas_hostname: null,
        canvas_job_tag: null,
        canvas_pid: null,
        elapsed: Math.random() * 15,
        query: "SELECT blah FROM something",
        waiting: Math.random() < 0.5
      };

      if (Math.random() < 0.2) {
        q.query = "<IDLE> in transaction";
      }

      if (Math.random() < 0.1) {
        q.query = "vacuum";
      }

      info.queries.push(q);
    }

    info.queries = info.queries.sort(function(a, b) {
      return b.elapsed - a.elapsed;
    });

    var samples = [];


	samples.push({
	  time: data.start_at,
	  queries: info.queries
	});

	if (samples.length > 5) {
	  samples.splice(0, samples.length - 5);
	}

	var db = {
    	name: dbname,
    	queries: info.queries,
    	samples: samples,
    }

    db.topFiveQueries = getTopFiveQueries(db);

    data2.push(db);
  });



  return data2;
}


function getLastSample(db) {
	return db.samples[db.samples.length - 1];
}



var controller = {
	databases: [],
  test: function(){},
	getLastSampleLength: function(db) {
      return getLastSample(db).queries.length;
    },
    getCountClassName: function(db) {
      var count = getLastSample(db).queries.length;
      var className = 'label';
      if (count >= 20) {
        className += ' label-important';
      }
      else if (count >= 10) {
        className += ' label-warning';
      }
      else {
        className += ' label-success';
      }
      return className;
    },
    load: function () {
    	controller.databases = getData();
    }
};
