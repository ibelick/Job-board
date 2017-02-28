var jobs = [
  {id:1, company:'Apple', title:'Front-End Developer', city:'San Francisco, SF'},
  {id:2, company:'Sony', title:'iOS Developer ', city:'Paris, France'},
  {id:3, company:'Ubisoft', title:'Software Engineer', city:'Berlin, Germany'}
];

function findJob (jobId) {
  return jobs[findJobKey(jobId)];
};

function findJobKey (jobId) {
  for (var key = 0; key < jobs.length; key++) {
    if (jobs[key].id == jobId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#job-List',
  data: function () {
    return {jobs: jobs, searchKey: '', searchCity: ''};
  },
  computed : {
    filteredCity: function () {
      var self = this;
      console.log("lol");
      return self.jobs.filter(function (job) {
        return job.city.indexOf(self.searchCity) !== -1
      })
    },
    filteredJobs: function () {
      var self = this;
      return self.jobs.filter(function (job) {
        return job.title.indexOf(self.searchKey) !== -1
      })
    }
  }
});

var AddJob = Vue.extend({
  template: '#add-job',
  data: function () {
    return {job: {company: '', title: '', city: ''}
    }
  },
  methods: {
    createJob: function() {
      var job = this.job;
      jobs.push({
        id: Math.random().toString().split('.')[1],
        company: job.company,
        title: job.title,
        city: job.city
      });
      router.push('/');
    }
  }
});

var router = new VueRouter({
  routes: [{path: '/', component: List, name: 'home'},
           {path: '/add-job', component: AddJob}
]});

new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
});
