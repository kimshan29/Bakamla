app.controller("projectCtrl", function ($route, $scope, HttpRequest, $http) {
    //Variable


    $scope.currentUser = {};
    $scope.form = {};

    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.masterIndikator = true;
    $scope.masterParameter = false;
    $scope.masterFaktorUji = false;
    //Form Load ======================================================================
    $scope.formLoad = function () {
        // try {
        //     $scope.currentUser = JSON.parse($cookies.get('currentUser'));
        // } catch (err) {
        //     $scope.currentUser = {};
        // }
        // alert("testing");
        // $('#komitmenkepatuhan').attr('disabled', 'disabled').off('click');

        $scope.renderProject();
        // $scope.renderReminder();
    }

    $scope.renderReminder = function () {
        var apiUrl = "/api/Reminder";
        $http.get(apiUrl).success(function (response) {
            $scope.listReminder = response;
            console.log(JSON.stringify($scope.listReminder));

        })
    }
    $scope.renderProject = function () {
        NProgress.start();
        $('.Loading').show();
        $('.page-form').hide();
        var apiUrl = "http://localhost:3000/listProject";
        $http.get(apiUrl).then(function (response) {
            $scope.listProject = response.data;
            console.log(JSON.stringify($scope.listProject));


            $('.Loading').hide();
            $('.page-form').show();
            NProgress.done();
        });
    }

    $scope.eventClickViewKegiatan = function (idIndikator) {
        $scope.masterParameter = true;
        $scope.masterIndikator = false;
        $scope.masterFaktorUji = false;

        $scope.idIndikator = idIndikator;
        var apiUrl = "http://localhost:3000/listKegiatan";
        $http.get(apiUrl).then(function (response) {
            $scope.listKegiatan = response.data;
            console.log(JSON.stringify($scope.listKegiatan));

        })
    }

    $scope.eventClickViewFaktorUji = function (idParameter) {
        $scope.masterParameter = false;
        $scope.masterIndikator = false;
        $scope.masterFaktorUji = true;

        // var apiUrl = "/api/MasterFaktorUji/" + idParameter + "?type=Parameter";
        var apiUrl = "http://localhost:3000/listSubKegiatan";
        // console.log(apiUrl);

        $http.get(apiUrl).then(function (response) {
            $scope.listFaktorUji = response.data;
            $scope.idIndikator = response.idIndikator;
            $scope.idParameter = idParameter
            // console.log("idindikator=", $scope.idIndikator);
            // console.log("idParameter=", $scope.idParameter);

            console.log(JSON.stringify($scope.listFaktorUji));

        })
    }
    $scope.eventClickEditParemeter = function () {
        $('#myModalParameter').modal({
            show: true
        });
    }

    $scope.eventClickMasterIndikator = function () {
        $scope.masterIndikator = true;
        $scope.masterParameter = false;
        $scope.renderProject();
    }

    $scope.eventClickKegiatan = function (idParameter) {
        $scope.eventClickViewKegiatan(idParameter);
    }

    $scope.deletePilihanJawaban = function (index) {
        $scope.form.dataPilihanJawaban.splice(index, 1);
    }

    $scope.getChapterI = function () {
        $scope.form.dataPilihanJawaban = [
            "Setuju", "Tidak Setuju"
        ]

        $scope.divPilihanJawaban = true;
        $scope.form.jawaban = '';
    }

    $scope.getChapterII = function () {
        $scope.divPilihanJawaban = false;
        $scope.form.dataPilihanJawaban = '';
        $scope.form.dataPilihanJawaban = [];
        $scope.form.jawaban = '';
    }

    $scope.getChapterIII = function () {
        $scope.divPilihanJawaban = false;
        $scope.form.dataPilihanJawaban = '';
        $scope.form.dataPilihanJawaban = [];
        $scope.form.jawaban = '';
    }

    $scope.updateActive = function () {
        $scope.form.isActive = true;
        // $scope.form.id = idSK;
        // $scope.form.tipe = typeSK;
        // alert("test");
        var dataForm = $scope.form;
        // console.log(JSON.stringify(dataForm))
        var apiUrl = "/api/SetStatusSK";
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.renderSurvey();

            $('#modalStatus').modal('hide');
        })
    }

    $scope.updateNonAktive = function () {
        $scope.form.isActive = false;

        var dataForm = $scope.form;
        var apiUrl = "/api/SetStatusSK";
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.renderSurvey();
            // console.log($scope.listMasterPetanyaan);

            $('#modalStatus').modal('hide');
        })
    }

    $scope.eventClickSaveIndikator = function () {
        $scope.formIndikator.username = $scope.currentUser.email;
        var dataForm = $scope.formIndikator;
        // console.log(JSON.stringify(dataForm));

        var apiUrl = "/api/MasterIndikator";
        HttpRequest.post(apiUrl, dataForm).success(function (response) {
            $scope.clearForm();
            $scope.eventClickCloseModal();
            $scope.renderProject();

        });
    }

    $scope.eventClickSaveParameter = function () {
        $scope.formParameter.username = $scope.currentUser.email;
        $scope.idIndikator = $scope.formParameter.idIndikator;
        // console.log($scope.idIndikator);

        var dataForm = $scope.formParameter;
        // console.log(JSON.stringify(dataForm));

        var apiUrl = "/api/MasterParameter";
        HttpRequest.post(apiUrl, dataForm).success(function (response) {

            var apiUrlParameter = "/api/MasterParameter/" + $scope.idIndikator + "?type=indikator";
            HttpRequest.get(apiUrlParameter).success(function (response) {
                $scope.listParameter = response;
                // console.log(JSON.stringify($scope.listParameter));

                $scope.eventClickCloseModalParameter();
            })

        });
    }

    $scope.eventClickSaveFaktorUji = function () {
        $scope.formFaktorUji.username = $scope.currentUser.email;
        $scope.formFaktorUji.status = 'dokumen';

        $scope.idParameter = $scope.formFaktorUji.idParameter;

        var dataForm = $scope.formFaktorUji;
        console.log(JSON.stringify(dataForm));

        var apiUrl = "/api/MasterFaktorUji";
        HttpRequest.post(apiUrl, dataForm).success(function (response) {

            var apiUrlFaktorUji = "/api/MasterFaktorUji/" + $scope.idParameter + "?type=parameter";
            // console.log(apiUrlFaktorUji);

            HttpRequest.get(apiUrlFaktorUji).success(function (response) {
                $scope.listFaktorUji = response.dataFaktorUji;
                $scope.eventClickCloseModalFaktorUji();
            })
        });
    }

    $scope.formParameter = {};
    $scope.eventClickAddParameter = function (idIndikator) {
        // console.log(idIndikator);
        var apiUrl = "/api/MasterIndikator/" + idIndikator;

        HttpRequest.get(apiUrl).success(function (response) {
            // console.log(JSON.stringify(response));

            $scope.formParameter.idIndikator = response.id;
            $scope.formParameter.indikator = response.indikator;
            $scope.formParameter.isActive = true;
            // console.log($scope.formParameter.idIndikator);
            // console.log($scope.formParameter.indikator);

        })
    }

    $scope.formFaktorUji = {};
    $scope.eventClickAddFaktorUji = function (idIndikator, idParameter) {

        // getIndikator
        HttpRequest.get("/api/MasterIndikator/" + idIndikator).success(function (response) {
            $scope.formFaktorUji.indikator = response.indikator;
        })
        // getParameter

        HttpRequest.get("/api/MasterParameter/" + idParameter).success(function (response) {
            $scope.formFaktorUji.parameter = response.parameter;
        })
        $scope.formFaktorUji.idParameter = idParameter;
        $scope.formFaktorUji.isActive = true;

    }

    $scope.formFaktorUji.dataPic = [];
    $scope.eventClickAddPIC = function () {

        $scope.formFaktorUji.dataPic.push($scope.formFaktorUji.pic);
        $scope.formFaktorUji.pic = '';
    }

    $scope.eventClickHapusPIC = function (index) {
        $scope.formFaktorUji.dataPic.splice(index, 1);
    }

    $scope.renderPIC = function (keyword) {
        var apiUrl = "/api/SearchPIC?name=" + keyword;
        return HttpRequest.get(apiUrl).then(function (response) {
            // console.log(JSON.stringify(response));
            // $scope.user.input.email = response.data.email;
            // console.log(JSON.stringify($scope.user.input.email));
            return response.data;
        });
    }
    $scope.eventClickEditIndikator = function (id) {

        $('#myModalIndikator').modal({
            show: true
        });

        var apiUrl = "/api/MasterIndikator/" + id;
        // console.log(apiUrl);

        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formIndikator = response;
            // console.log(JSON.stringify($scope.formIndikator));
        })


    }

    $scope.eventClickEditParameter = function (id) {

        $('#myModalParameter').modal({
            show: true
        });

        var apiUrl = "/api/MasterParameter/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formParameter = response;
            console.log(JSON.stringify($scope.formParameter));
        })


    }

    $scope.eventClickEditFaktorUji = function (id) {

        $('#myModalFaktorUji').modal({
            show: true
        });

        $scope.renderReminder();

        var apiUrl = "/api/MasterFaktorUji/" + id;
        HttpRequest.get(apiUrl).success(function (response) {
            $scope.formFaktorUji = response;
            console.log(JSON.stringify($scope.formFaktorUji));
        })


    }

    $scope.eventClickHapusIndikator = function (id) {
        var apiUrl = "/api/MasterIndikator/" + id;
        // console.log(apiUrl);
        var hapus = confirm("Apakah anda yakin ingin menghapus data ini?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    $scope.renderProject();
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Master Indikator",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }

    $scope.eventClickHapusParameter = function (id, idIndikator) {
        var apiUrl = "/api/MasterParameter/" + id;
        // console.log(apiUrl);
        var hapus = confirm("Apakah anda yakin ingin menghapus data ini?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    var apiUrlParameter = "/api/MasterParameter/" + idIndikator + "?type=indikator";
                    HttpRequest.get(apiUrlParameter).success(function (response) {
                        $scope.listParameter = response;
                        // console.log(JSON.stringify($scope.listParameter));
                    })
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Master Parameter",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }

    $scope.eventClickHapusFaktorUji = function (id, idParameter) {
        var apiUrl = "/api/MasterFaktorUji/" + id;
        // console.log(apiUrl);
        var hapus = confirm("Apakah anda yakin ingin menghapus data ini?");

        if (hapus) {
            // NProgress.start();

            HttpRequest.del(apiUrl).success(function (response) {
                    var apiUrl = "/api/MasterFaktorUji/" + idParameter + "?type=Parameter";
                    // console.log(apiUrl);

                    HttpRequest.get(apiUrl).success(function (response) {
                        $scope.listFaktorUji = response.dataFaktorUji;
                        $scope.idIndikator = response.idIndikator;
                        $scope.idParameter = idParameter
                        // console.log("idindikator=", $scope.idIndikator);
                        // console.log("idParameter=", $scope.idParameter);

                        console.log(JSON.stringify($scope.listFaktorUji));

                    })
                })
                .error(function (response, code) {
                    // NProgress.done();

                    var data = {
                        title: "Master Faktor Uji",
                        exception: response,
                        exceptionCode: code,
                        operation: "DELETE",
                        apiUrl: apiUrl
                    };

                    Helper.notifErrorHttp(data);
                });
        }
    }


    $scope.clearFormIndikator = function () {
        $scope.formIndikator.id = '';
        $scope.formIndikator.indikator = '';
        $scope.formIndikator.isActive = undefined;
    }

    $scope.clearFormParameter = function () {
        $scope.formParameter.id = '';
        $scope.formParameter.indikator = '';
        $scope.formParameter.parameter = '';
        $scope.formParameter.isActive = undefined;
    }

    $scope.clearFormFaktorUji = function () {
        $scope.formFaktorUji.id = '';
        $scope.formFaktorUji.dataPic = [];
        $scope.formFaktorUji.idParameter = '';
        $scope.formFaktorUji.isActive = undefined;
        $scope.formFaktorUji.indikator = '';
        $scope.formFaktorUji.parameter = '';
        $scope.formFaktorUji.faktorUji = '';
        $scope.formFaktorUji.reminder = undefined;
        $scope.formFaktorUji.syaratPemenuhan = '';
    }

    $scope.eventClickCloseModal = function () {
        $scope.clearForm();
        $('#myModalIndikator').modal('hide');
        $scope.renderProject();
    }

    $scope.eventClickCloseModalParameter = function () {
        $scope.clearFormParameter();
        $('#myModalParameter').modal('hide');
        // $scope.renderProject();
    }

    $scope.eventClickCloseModalFaktorUji = function () {
        $scope.clearFormFaktorUji();
        $('#myModalFaktorUji').modal('hide');
        // $scope.renderProject();
    }

    $scope.editTest = function name(params) {
        alert("hello");
    }

    //Start of Application ===============================================================
    $scope.formLoad();
})