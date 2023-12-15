! function(e) {
    "use strict";
    var t = function() {
        this.$body = e("body"), this.$event = "#external-events div.external-event", this.$calendar = e("#calendar"), this.$saveCategoryBtn = e(".save-category"), this.$extEvents = e("#external-events"), this.$calendarObj = null
    };
    t.prototype.onDrop = function(t, n) {
        var a = t.data("eventObject"),
            o = t.attr("data-class"),
            i = e.extend({}, a);
        i.start = n, o && (i.className = [o]), this.$calendar.fullCalendar("renderEvent", i, !0), e("#drop-remove").is(":checked") && t.remove()
    }, t.prototype.onEventClick = function(t, n, a) {
        if(t.foreignType == "schedule"){
            alert("상세 일정이 없습니다.");
        }else{
            carList.carPopup(t.carReqSn);
        }
        /*$("#event-modal").find("strong").text("일정수정");
        var o = this,
            i = e("<form></form>");
            i.append("<div class='input-group'><input class='form-control' type=text value='" + t.title + "' /><span class='input-group-btn'><button type='button' id='updateBtn' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> 저장</button></span></div>");
            if(t.foreignType != "schedule"){
                i.find("div").append("<span class='input-group-btn' style='margin-left: 10px;'><button type='button' id='detailBtn' class='btn btn-success waves-effect waves-light' onclick=\"deptScheduleList.fn_detailSchedule('"+ t.foreignKey +"', '"+ t.foreignType +"');\"><i class='fa fa-check'></i>상세보기</button></span>");
            }
            o.$modal.modal({
            backdrop: "static"
        }), o.$modal.find(".delete-event").show().end().find(".save-event").hide().end().find(".modal-body").empty().prepend(i).end().find(".delete-event").unbind("click").on("click", function() {
            o.$calendarObj.fullCalendar("removeEvents", function(e) {
                return e._id == t._id
            }),deptScheduleList.fn_deleteSchedule({scheduleId : t.scheduleId}), o.$modal.modal("hide")
        }), o.$modal.find("#updateBtn").on("click", function() {
                var data = {};
                data.title = i.find("input[type=text]").val();
                data.scheduleId = t.scheduleId;
                deptScheduleList.fn_updateSchedule(data);
            return t.title = i.find("input[type=text]").val(), o.$calendarObj.fullCalendar("updateEvent", t), o.$modal.modal("hide"), !1
        })*/
    }, t.prototype.enableDrag = function() {
        e(this.$event).each(function() {
            var t = {
                title: e.trim(e(this).text())
            };
            e(this).data("eventObject", t), e(this).draggable({
                zIndex: 999,
                revert: !0,
                revertDuration: 0
            })
        })
    }, t.prototype.init = function() {
        this.enableDrag();
        var t = new Date,
            n = (t.getDate(), t.getMonth(), t.getFullYear(), new Date(e.now())),
            a = carList.getScheduleData(),
            o = this;
        o.$calendarObj = o.$calendar.fullCalendar({
            lang:"ko",
            displayEventTime: false, // 제목 옆에 시작시간 오전오후 표시되는거 숨김
            slotDuration: "00:15:00",
            minTime: "08:00:00",
            maxTime: "19:00:00",
            defaultView: "month",
            handleWindowResize: !0,
            height: e(window).height() - 100,
            header: {
                left: "prev,next today",
                center: "title",
                right: ""
                //right: "month,agendaWeek,agendaDay"
            },
            events: a,
            editable: 0,
            droppable: !0,
            eventLimit: 2, // 한 날짜에 표시할 수 있는 이벤트 개수 제한
            eventLimitText: "더보기", // 더보기 링크 텍스트 설정
            selectable: !0,
            drop: function(t) {
                o.onDrop(e(this), t)
            },
            /*select: function(e, t, n) {
                o.onSelect(e, t, n)
            },*/
            eventClick: function(e, t, n) {
                o.onEventClick(e, t, n)
            }
        }), this.$saveCategoryBtn.on("click", function() {
            var e = o.$categoryForm.find("input[name='category-name']").val(),
                t = o.$categoryForm.find("select[name='category-color']").val();
            null !== e && 0 != e.length && (o.$extEvents.append('<div class="external-event bg-' + t + '" data-class="bg-' + t + '" style="position: relative;"><i class="fa fa-move"></i>' + e + "</div>"), o.enableDrag())
        })
    }, e.CalendarApp = new t, e.CalendarApp.Constructor = t, carList.global.cal = new t, carList.global.cal.Constructor = t
}(window.jQuery),
function(e) {
    "use strict";
    e.CalendarApp.init()
}(window.jQuery);