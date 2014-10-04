app.factory('VoteResource', function ($resource) {
    var VoteResource = $resource('/api/votes/:id', { id: '@id' }, { update: { method: 'PUT', isArray: false }});
    return VoteResource;
});