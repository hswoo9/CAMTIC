/**
 * Kendo Setting
 * @type {{
 *         global: {},
 *         fn_gridDataSource: (function(*, *): *),
 *         fn_gridDataSource2: (function(*, *): *),
 *         fn_textBox: customKendo.fn_textBox,
 *         fn_textArea: customKendo.fn_textArea,
 *         fn_customAjax: (function(*, *): *),
 *         fn_dropDownList: customKendo.fn_dropDownList,
 *         fn_dropDownTree: customKendo.fn_dropDownList,
 *         fn_datePicker: customKendo.fn_datePicker
 *        }}
 */
var customKendo = {

    global : {

    },

    /**
     * Custom KendoDataSource > Paging totalCount
     * @param url : url
     * @param params : parameters
     * @returns {*}
     */
    fn_gridDataSource : function(url, params){
        var dataSource = new kendo.data.DataSource({
            serverPaging: true,
            pageSize: 10,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    for(var key in params){
                        data[key] = params[key];
                    }

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    record = data.totalCount;

                    return record;
                },
            }
        });

        return dataSource;
    },

    /**
     * Custom KendoDataSource2 > Paging Length
     * @param url
     * @param params
     * @returns {*}
     */
    fn_gridDataSource2 : function(url, params, pageSize){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: pageSize == null ? 10 : pageSize,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    for(var key in params){
                        data[key] = params[key];
                    }

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
        });

        return dataSource;
    },

    /**
     * Custom KendoDataSource2 > Paging Length
     * @param url
     * @param params
     * @returns {*}
     */
    fn_gridDataSource3 : function(url, params, pageSize){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: pageSize == null ? 10 : pageSize,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    for(var key in params){
                        data[key] = params[key];
                    }

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.rs;
                },
                total: function (data) {
                    return data.rs.length;
                },
            },
        });

        return dataSource;
    },

    /**
     * Custom kendoDatePicker
     * culture : ko-KR
     * @param id
     * @param opt
     * @param format
     * @param value
     */
    fn_datePicker : function (id, opt, format, value) {
        $("#" + id).kendoDatePicker({
            depth: opt,
            start: opt,
            culture : "ko-KR",
            format : format,
            value : value
        });
    },

    /**
     * Custom kendoTimePicker
     * culture : ko-KR
     * @param id
     * @param opt
     * @param format
     * @param value
     */
    fn_timePicker : function (id, opt, format, value) {
        $("#" + id).kendoTimePicker({
            culture : "ko-KR",
            interval : opt,
            format : format,
            value : value
        });
    },

    /**
     * Custom KendoTextBox
     * @param idArray[]
     */
    fn_textBox : function(idArray){
        for(var i = 0; i < idArray.length; i++){
            $("#"+idArray[i]).kendoTextBox();
        }
    },

    /**
     * Custom KendoTextArea
     * @param idArray[]
     */
    fn_textArea : function(idArray){
        for(var i = 0; i < idArray.length; i++){
            $("#"+idArray[i]).kendoTextArea();
        }
    },

    /**
     * Custom KendoDropDownList
     * @param id
     * @param dataSource
     * @param textField
     * @param valueField
     * @param type
     */
    fn_dropDownList : function (id, dataSource, textField, valueField, type){
        if(type == "2"){
            dataSource.unshift({[textField] : "선택하세요", [valueField] : ""});
        }else if(type == "3"){
            //type이 3일때는 기본 항목 없음
        }else if(type == "4"){
            dataSource.unshift({[textField] : "직책 선택", [valueField] : ""});
        }else if(type == "5"){
            dataSource.unshift({[textField] : "팀 선택", [valueField] : ""});
        }else if(type == "6"){
            dataSource.unshift({[textField] : "부서 선택", [valueField] : ""});
        }else{
            dataSource.unshift({[textField] : "전체", [valueField] : ""});
        }

        $("#" + id).kendoDropDownList({
            dataSource : dataSource,
            dataTextField: textField,
            dataValueField: valueField
        });
    },

    /**
     * Custom kendoDropDownTree
     * @param id
     * @param dataSource
     * @param textField
     * @param valueField
     * @param type
     */
    fn_dropDownTree : function (id, dataSource, textField, valueField, type){
        let placeholder = "";
        if(type == "2"){
            placeholder = "선택하세요";
        }else if(type == "3"){
            //type이 3일때는 기본 항목 없음
        }else{
            placeholder = "전체";
        }

        $("#" + id).kendoDropDownTree({
            placeholder: placeholder,
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource : dataSource,
            dataTextField: textField,
            dataValueField: valueField
        });
    },

    /**
     * Custom Ajax
     * type : post
     * dataType : json
     * async : false
     * @param url
     * @param data
     * @returns {*}
     */
    fn_customAjax : function(url, data){
        var result;
        $.ajax({
            url: url,
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(rs) {
                result = rs;
                result.flag = true;
            },
            error: function (e) {
                result.flag = false;
                console.log('error : ', e);
            }
        });

        return result;
    },

    /**
     * Custom Form Data Ajax
     * type : post
     * dataType : json
     * async : false
     * @param url
     * @param data
     * @returns {*}
     */
    fn_customFormDataAjax : function(url, data){
        var result;
        $.ajax({
            url : url,
            data : data,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(rs) {
                result = rs;
                result.flag = true;
            },
            error :function (e) {
                result.flag = false;
                console.log('error : ', e);
            }
        });

        return result;
    },

    /**
     * Custom KendoWindow
     * default :
     *  visible : false
     *  modal : true
     *  actions: ["close"]
     * @param id     : id
     * @param height : 높이
     * @param width  : 넓이
     * @param title  : 제목
     */
    fn_kendoWindow : function(id, height, width, title) {
        $("#" + id).kendoWindow({
            height: height + "px",
            width : width + "px",
            visible: false,
            title: title,
            modal : true,
            actions: ["Close"]
        }).data("kendoWindow").center();
    },

    /**
     * Custom kendoWindowClose function
     * @param id : id
     */
    fn_kendoWindowClose : function(id) {
        var dialog = $("#" + id).data("kendoWindow");
        dialog.close();
    },


    /**
     * custom kendoScheduler
     * @param id : id
     * @param dataSource : DataSource
     * @param editHtml : editorHtml
     * @param resources : resources
     */
    fn_kendoScheduler: function(id, dataSource, editHtml, resources) {
        kendo.culture("ko-KR");

        $("#" + id).kendoScheduler({
            date: new Date(),
            startTime: new Date(),
            height: 671,
            views: [
                "month"
            ],
            timezone: "Etc/UTC",
            dataSource: dataSource,
            selectable: false,
            editable : {
                template : editHtml,    // 에디터 template 설정
                destroy : false         // 에디터 close 시 항목 삭제 방지
            },
            edit : function(e){
                var buttonsContainer = e.container.find(".k-edit-buttons");

                buttonsContainer.remove(); // 에디터 하단 버튼 제거
                $(".k-window-title").html("연차 상세");
            },
            resources: resources
        });
    }


}