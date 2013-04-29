angular.module('tikvah.catalog.services', []).
    service('CategoryService', function () {
        this.categories = function () {
            return [
                {label: 'Electronics', children: [
                    {label: 'Computers'},
                    {label: 'Home Appliances'}
                ]},
                {label: 'Books'},
                {label: 'Music'}
            ]
        }
    });
