angular.module('tikvah.catalog.controllers', ['tikvah.catalog.services']).
    controller('CategoryController', function ($scope, CategoryService) {

        function init() {
            $scope.categories = CategoryService.categories();
            $('#categoryTree').tree({data: $scope.categories});
        }

        init();

    })