angular.module('selects',[])
        .directive('selectize',['$http', function ($http) {
            return{
                restrict:'E',
                template:'<input type="text">',
                replace:true,
                require:'ngModel',
                scope:{
                    options:'@',
                    ngModel:'='
                },
               link:function(scope, element, attrs,ngModel){
                   var opts;
                   var $element = $(element);
                   $http.get(scope.options).success(function(data){
                        opts = data.options;
                        $element.selectize({
                            options:opts,
                            onItemAdd:refreshModel()
                        });
                    });
                   function refreshModel(){
                       ngModel.$viewValue = $element.items;
                   }
               }
            }
    }]);