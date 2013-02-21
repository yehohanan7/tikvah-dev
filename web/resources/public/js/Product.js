var tikvah = angular.module('tikvah', []);

tikvah.controller('ProductCtrl', function ($scope) {


    $scope.all = [
        {id: 1, name: "Mac Book pro", price: "$123456", available: true},
        {id: 2, name: "Mac Book pro", price: "$123456", available: true},
        {id: 3, name: "XBOX", price: "$123456", available: false, media: {
            photos: ['img/gallery/xbox-1.jpg', 'img/gallery/xbox-2.jpg', 'img/gallery/xbox-3.jpg']
        }},
        {id: 4, name: "PS3", price: "$123456", available: false}
    ]

    $scope.results = [];


    $scope.find = function () {
        //var searchKey = $scope.searchKey;
        $scope.results.push.apply($scope.results, $scope.all);
        $('#productsModal').modal({})
    }

    $scope.select = function (index) {
        $scope.selected = $scope.results[index - 1]
    }


    $('.products-typeahead').typeahead(
        {
            source: function (typeahead, query) {
                var results = $.map($scope.all, function (product) {
                    return product.name;
                });
                return results;
            },

            updater: function (searchKey) {
                return searchKey;

            }
        }
    );

    $(document).ready(function () {
        $('.carousel').carousel();
    });


})

