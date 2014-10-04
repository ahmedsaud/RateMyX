app.factory('CategoryResource', function ($resource) {
    var CategoryResource = $resource('/api/categories/:name', { name: '@name' }, { update: { method: 'PUT', isArray: false }});
    return CategoryResource;
});