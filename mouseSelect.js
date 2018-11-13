function mouseSelect(domClass, tableClass, containerId, dragArea, insertDivcallback) {

    (function () {
        var table = document.querySelectorAll(tableClass)[0];
        var containerCreat = $(dragArea);
        var fileNodes = "";
        var selList = [];
        var isSelect = false;
        var evt = "",
            startX = "",
            startY = "",
            selDiv = "",
            _x = null,
            _y = null,
            ismove = false,
            isdrag = false;

        //在table内部鼠标点击开始
        table.onmousedown = function () {
            selList = [];
            fileNodes = document.querySelectorAll(domClass);
            // var page = document.querySelectorAll(domappendClass)[0];
            for (var i = 0; i < fileNodes.length; i++) {

                if (fileNodes[i].className.indexOf("fileDiv") != -1) {

                    fileNodes[i].className = "fileDiv";

                    selList.push(fileNodes[i]);

                }

            }
            isSelect = true;

            evt = window.event || arguments[0];

            startX = (evt.x || evt.clientX);

            startY = (evt.y || evt.clientY);

            selDiv = document.createElement("div");

            selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:#C3D5ED;z-index:1000;filter:alpha(opacity:60);opacity:0.6;display:none;";

            selDiv.id = "selectDiv";

            document.body.appendChild(selDiv);

            selDiv.style.left = startX + "px";

            selDiv.style.top = startY + "px";

            _x = null;

            _y = null;

            clearEventBubble(evt);

            $(document).on("mousemove", documentmousemove)
            $(document).on("mouseup", documentmouseup)
            // document.addEventListener("mousemove", documentmousemove, false);
            // document.addEventListener("mouseup", documentmouseup, false);
            // document.onmousemove = function () {

            // documentmousemove();

            // evt = window.event || arguments[0];

            // if (isSelect) {

            //     if (selDiv.style.display == "none") {

            //         selDiv.style.display = "";

            //     }
            //     _x = (evt.x || evt.clientX);

            //     _y = (evt.y || evt.clientY);
            //     selDiv.style.left = Math.min(_x, startX) + "px";

            //     selDiv.style.top = Math.min(_y, startY) + "px";

            //     selDiv.style.width = Math.abs(_x - startX) + "px";

            //     selDiv.style.height = Math.abs(_y - startY) + "px";

            //     // ---------------- 关键算法 ---------------------  
            //     var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;

            //     var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;

            //     for (var w = 0; w < selList.length; w++) {
            //         var sl = selList[w].offsetWidth + selList[w].offsetLeft + $(containerId).offset().left + table.offsetLeft;
            //         var st = selList[w].offsetHeight + selList[w].offsetTop + $(containerId).offset().top + table.offsetTop;

            //         if (sl > _l && st > _t
            //             && $(containerId).offset().left + table.offsetLeft + selList[w].offsetLeft < _l + _w
            //             && $(containerId).offset().top + table.offsetTop + selList[w].offsetTop < _t + _h) {

            //             if (selList[w].className.indexOf("seled") == -1) {
            //                 selList[w].className = selList[w].className + " seled";
            //             }

            //             //获取左上角的td元素，需要覆盖在其上得div的定位left，top
            //             // var pl = selList[w].offsetLeft + $(containerId).offset().left + table.offsetLeft;
            //             // var pt = selList[w].offsetTop + $(containerId).offset().top + table.offsetTop;

            //         } else {

            //             if (selList[w].className.indexOf("seled") != -1) {

            //                 selList[w].className = "fileDiv";

            //             }

            //         }

            //     }

            // }

            // clearEventBubble(evt);

            // }

            // document.onmouseup = function () {
            // isSelect = false;
            // if (selDiv) {
            //     $("#selectDiv").remove();
            //     // document.body.removeChild(selDiv);
            //     showSelDiv(selList, table);
            // }
            // selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
            // }


            //在table容器内鼠标抬起
            function documentmouseup(ev) {
                // console.log("在圈选中结束的mouseup事件")
                isSelect = false;
                $(document).off("mousemove");
                $(document).off("mouseup");
                if (selDiv && !ismove && !isdrag) {
                    $("#selectDiv").remove();
                    //清除没内容div
                    emptyrepeatdiv();
                    //插入div并检测是否重叠
                    dropmouselect(showSelDiv(selList, table));
                    for (var w = 0; w < selList.length; w++) {
                        if (selList[w].className.indexOf("seled") != -1) {
                            selList[w].className = "fileDiv";
                        }
                    }
                }
                selList = null, _x = null, _y = null, selDiv = null, startX = null, startY = null, evt = null;
            }

            //在table容器内鼠标左键按下移动
            function documentmousemove() {
                // debugger
                // console.log(2222222222222222)
                evt = window.event || arguments[0];

                if (isSelect) {

                    if (selDiv.style.display == "none") {

                        selDiv.style.display = "";

                    }
                    _x = (evt.x || evt.clientX);

                    _y = (evt.y || evt.clientY);
                    selDiv.style.left = Math.min(_x, startX) + "px";

                    selDiv.style.top = Math.min(_y, startY) + "px";

                    selDiv.style.width = Math.abs(_x - startX) + "px";

                    selDiv.style.height = Math.abs(_y - startY) + "px";

                    // ---------------- 关键算法 ---------------------  
                    var _l = selDiv.offsetLeft, _t = selDiv.offsetTop;

                    var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;

                    for (var w = 0; w < selList.length; w++) {
                        var sl = selList[w].offsetWidth + selList[w].offsetLeft + $(containerId).offset().left + table.offsetLeft;
                        var st = selList[w].offsetHeight + selList[w].offsetTop + $(containerId).offset().top + table.offsetTop;

                        if (sl > _l && st > _t
                            && $(containerId).offset().left + table.offsetLeft + selList[w].offsetLeft < _l + _w
                            && $(containerId).offset().top + table.offsetTop + selList[w].offsetTop < _t + _h) {

                            if (selList[w].className.indexOf("seled") == -1) {
                                selList[w].className = selList[w].className + " seled";
                            }

                            //获取左上角的td元素，需要覆盖在其上得div的定位left，top
                            // var pl = selList[w].offsetLeft + $(containerId).offset().left + table.offsetLeft;
                            // var pt = selList[w].offsetTop + $(containerId).offset().top + table.offsetTop;

                        } else {

                            if (selList[w].className.indexOf("seled") != -1) {

                                selList[w].className = "fileDiv";

                            }

                        }

                    }

                }

                clearEventBubble(evt);
            }
        }

        // })();

        function allowDrop(ev) {
            ev.preventDefault();
        }

        //清除默认和冒泡事件
        function clearEventBubble(evt) {

            if (evt.stopPropagation)

                evt.stopPropagation();

            else

                evt.cancelBubble = true;

            if (evt.preventDefault)

                evt.preventDefault();

            else

                evt.returnValue = false;

        }

        var istarget = "";
        //鼠标圈选结束开始添加覆盖div元素
        function showSelDiv(arr, table) {
            var selInfo = "";
            var plStartX = "";      //圈选开始x坐标
            var plStartY = "";      //圈选开始y坐标
            var plEndX = "";       //圈选结束x坐标
            var plEndY = "";       //圈选结束y坐标
            var unieId = "";        //唯一id
            var selTableInfo = {      //选择的td元素
                count: 0,
                domSel: []
            }

            $(".moveframe .drag").off("mousedown")
            $(".moveframe .move").off("mousedown")
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].className.indexOf("seled") != -1) {
                    selTableInfo.count++;
                    selTableInfo.domSel.push(arr[i])
                }
            }
            if (selTableInfo.domSel.length < 1) {
                return;
            }

            plStartX = selTableInfo.domSel[0].offsetLeft + table.offsetLeft;
            plStartY = selTableInfo.domSel[0].offsetTop + table.offsetTop;
            plEndX = selTableInfo.domSel[selTableInfo.domSel.length - 1].offsetLeft + selTableInfo.domSel[selTableInfo.domSel.length - 1].offsetWidth + table.offsetLeft;
            plEndY = selTableInfo.domSel[selTableInfo.domSel.length - 1].offsetTop + selTableInfo.domSel[selTableInfo.domSel.length - 1].offsetHeight + table.offsetTop;

            unieId = "unieId" + parseInt(Math.random() * 99999);
            var html = "<div class='moveframe' active='true' id=" + unieId + " draggable='true' style='background:rgba(76,101,164,0.5);overflow:auto;z-index:10;position:absolute;width:" + (plEndX - plStartX) + "px;height:" + (plEndY - plStartY) + "px;left:" + plStartX + "px;top:" + plStartY + "px;'>" +
                "<div class='content chart-show' contenteditable='true' style='position:relative;padding:5px 5px;overflow-y:auto;width:100%;height:calc(100% - 30px);margin-top:15px;'></div>" +
                "<span class='move' style='display:none;position:absolute;right:0;bottom:0;cursor:nw-resize;width:15px;height:15px;background:rgba(76,101,164,1)'></span>" +
                "<span class='drag' style='display:none;position:absolute;left:0;top:0;cursor:move;width:15px;height:15px;background:rgba(76,101,164,1)'></span>" +
                "</div>"

            $(table).parent().append(html);
            // $(".moveframe").on("dragstart",  drag);
            // $(".moveframe .content").one("mouseup",function(e){
            // $(document).trigger("mouseup");
            // })

            // $(".moveframe .content").off("drop")
            // $(".moveframe .content").on("drop", drop)
            // $(".moveframe::after").css({ "content": "", "display": "block", "width": "10px", "height": "10px", "background":"rgba(76,101,164,1)"})
            // $(html).mousedown(()=>{
            // debugger
            // isSelect = true;
            // })/
            // var ismove = false;
            // var isdrag = false;

            //改变尺寸大小
            $(".moveframe .move").on("mousedown", function (event) {
                var el = $(this).parent();
                var sizeX = "";
                var sizeY = "";
                ismove = true;
                window.storeData = el.attr("id");
                clearEventBubble(event);
                $(table).css("cursor", "Crosshair");
                dragmovesize(event);
                $(document).on("mousemove mouseup", function (e) {
                    if (ismove && e.type == "mousemove") {
                        sizeX = e.clientX - el.offset().left;
                        sizeY = e.clientY - el.offset().top;
                        el.css({ "width": sizeX, "height": sizeY });
                    } else {
                        console.log("在改变尺寸中结束的mouseup事件")
                        dropmovesize(e);
                        $(document).off("mousemove")
                        $(document).off("mouseup")
                        ismove = false;
                        $(table).css("cursor", "default");
                        sizeX = null, sizeY = null, el = null;
                    }
                })
            })

            //拖动
            $(".moveframe .drag").on("mousedown", function (event) {
                var el = $(this).parent();
                var dragX = "";
                var dragY = "";
                window.storeData = el.attr("id");
                isdrag = true;
                clearEventBubble(event);
                istarget = el;
                $(table).css("cursor", "move")
                drag(event);
                $(document).on("mousemove mouseup", function (e) {
                    if (isdrag && e.type == "mousemove") {
                        dragX = e.clientX - $(containerId).offset().left;
                        dragY = e.clientY - $(containerId).offset().top;
                        el.css({ "left": dragX, "top": dragY });
                    } else {
                        console.log("在拖动中结束的mouseup事件")
                        isdrag = false;
                        drop(e)
                        $(document).off("mousemove")
                        $(document).off("mouseup")
                    }
                })
            })

            $(".moveframe").on("mouseenter mouseleave",function(event){
                if(event.type=="mouseenter"){
                    $(this).find(".move").css("display","block")
                    $(this).find(".drag").css("display","block")
                }else{
                    $(this).find(".move").css("display","none")
                    $(this).find(".drag").css("display","none")
                }
            })

            $(".moveframe .content").on("focus",function(event){
                var parentId = event.target.parentNode.getAttribute("id");
                $(".moveframe").each(function(index,item){
                    if (item.id == parentId){
                        item.setAttribute("active",true);
                        insertDivcallback($(".moveframe"), parentId )
                    }else{
                        item.removeAttribute("active")
                    }
                })
            })
            $(".moveframe").each(function(index,item){
                if (item.getAttribute("id") !== unieId){
                    item.removeAttribute("active");
                }
            })
            insertDivcallback($(".moveframe"), unieId)
            return unieId
            // //拖动检测 
            // $(".moveframe").on("dragstart", drag)
            // alert("共选择 " + count + " 个文件，分别是：\n" + selInfo);
        }

        var storeData = "";
        var mX, mY = 0
        var dX, dY = 0
        var brothersinfo = []//所有兄弟节点的位置信息
        // function 
        //拖动开始
        function drag(ev) {
            // debugger
            // storeData = ev.storeData;
            //获得鼠标起始位置
            var Pos = getMousePos();
            // debugger
            mX = $("#" + window.storeData).offset().left - $(containerId).offset().left;
            mY = $("#" + window.storeData).offset().top - $(containerId).offset().top;
            console.log("mousestart:", mX, mY)
            // debugger
            // mX = Pos.x - $(containerId).offset().left;
            // mY = Pos.y - $(containerId).offset().top;
            // console.log("mousestart:", mX, mY)
            //获得div偏移位置
            // dX = ev.target.offsetLeft
            // dY = ev.target.offsetTop
            // console.log("divoffset:", dX, dY)
            //获取兄弟节点的top,left,width(400),height(300)  
            var childs = ev.target.parentNode.parentNode.children;
            var brothers = []
            for (var i = 1; i < childs.length; i++) {
                if (childs[i] !== ev.target.parentNode)
                    brothers.push(childs[i])
            }
            brothersinfo = []
            brothers.forEach(function (item) {
                //parseInt的作用在于把'10px'变成'10'
                brothersinfo.push({ 'left': parseInt(item.style.left), 'top': parseInt(item.style.top), 'id': item.id })
            })
            console.log(brothersinfo)
        }

        //拖动结束
        function drop(ev) {
            var Ftop = 0;
            var Fleft = 0;
            // debugger
            // console.log(window.storeData)
            // ev.preventDefault();
            // console.log(33333)
            // isdrag = false;
            // $(".moveframe").off("dragstart");
            // $(document).off("mousemove");
            $(table).css("cursor", "default");
            // dragX = null, dragY = null, el = null;

            //获得鼠标拖动距离
            var position = getMousePos()
            // debugger
            var endx = position.x - $(containerId).offset().left;
            var endy = position.y - $(containerId).offset().top;
            console.log("mousesend:", endx, endy)
            // var data = ev.dataTransfer.getData("Text");
            var data = window.storeData;
            // debugger
            // var targetdiv = document.getElementById(data)
            var targetdiv = $("#" + data);
            //预计最终位置
            // Ftop = dY + y - mY
            // Fleft = dX + x - mX
            // console.log("finalPos:", Ftop, Fleft)
            // console.log("进入释放函数一次")
            if (isInterset(endx, endy, targetdiv) == false) {
                console.log("判定结果不相交")
                targetdiv.css("top", endy + 'px')
                targetdiv.css("left", endx + 'px')
                // targetdiv.style.top = Ftop + 'px'
                // targetdiv.style.left = Fleft + 'px'
            } else {
                // debugger
                console.log("判定结果相交")
                //如果相交则回到原位
                targetdiv.css("top", mY + 'px')
                targetdiv.css("left", mX + 'px')
                // targetdiv.style.top = dY + 'px'
                // targetdiv.style.left = dX + 'px'
            }

            brothersinfo = [];
            // storeData = "";
            // $(dragArea).append(targetdiv)
            // document.getElementById(dragArea).appendChild(targetdiv);
            // document.getElementById(data).draggable=false
        }

        function dragmovesize(ev) {
            // debugger
            // storeData = ev.storeData;
            //获得鼠标起始位置
            var Pos = getMousePos();
            // debugger
            // mX = Pos.x - $(containerId).offset().left;
            // mY = Pos.y - $(containerId).offset().top;
            mX = $("#" + window.storeData).width();
            mY = $("#" + window.storeData).height();
            console.log("mousestart:", mX, mY)
            //获得div偏移位置
            // dX = ev.target.offsetLeft
            // dY = ev.target.offsetTop
            // console.log("divoffset:", dX, dY)
            //获取兄弟节点的top,left,width(400),height(300)  
            var childs = ev.target.parentNode.parentNode.children;
            var brothers = []
            for (var i = 1; i < childs.length; i++) {
                if (childs[i] !== ev.target.parentNode)
                    brothers.push(childs[i])
            }
            brothersinfo = []
            brothers.forEach(function (item) {
                //parseInt的作用在于把'10px'变成'10'
                brothersinfo.push({ 'left': parseInt(item.style.left), 'top': parseInt(item.style.top), 'id': item.id })
            })
            console.log(brothersinfo)
        }
        function dropmovesize(ev) {
            //获得鼠标拖动距离
            var position = getMousePos()
            // debugger
            var endx = position.x - $(containerId).offset().left;
            var endy = position.y - $(containerId).offset().top;
            console.log("mousesend:", endx, endy)
            var data = window.storeData;
            var targetdiv = $("#" + data);
            console.log("进入尺寸改变结束函数一次")
            if (isIntersetmovesize(endx, endy, targetdiv) == false) {
                console.log("判定结果不相交")
                // debugger
                // targetdiv.css("top", endy + 'px')
                // targetdiv.css("left", endx + 'px')
                // targetdiv.style.top = Ftop + 'px'
                // targetdiv.style.left = Fleft + 'px'
            } else {
                // debugger
                console.log("判定结果相交")
                // debugger 
                //如果相交则回到原位
                // targetdiv.css("top", mY + 'px')
                // targetdiv.css("left", mX + 'px')
                // targetdiv.style.top = dY + 'px'
                // targetdiv.style.left = dX + 'px'
                // var sizeX = endx - (endx - mX) - (targetdiv.offset().left - $(containerId).offset().left);
                // var sizeY = endy - (endy - mY) - (targetdiv.offset().top - $(containerId).offset().top);
                targetdiv.css({ "width": mX, "height": mY });
            }

            brothersinfo = [];
        }

        function emptyrepeatdiv() {
            containerCreat.children().each(function (index, item) {
                if (index > 0 && item.children[0].className == "content" && item.children[0].children.length < 1 && item.children[0].innerHTML == "") {
                    item.remove();
                }
            })
        }

        //取消鼠标圈选重叠
        function dropmouselect(targetdiv) {
            //获得鼠标拖动距离
            // debugger
            if(!targetdiv){
                return;
            }
            var els = $("#" + targetdiv);
            mX = els.offset().left - $(containerId).offset().left;
            mY = els.offset().top - $(containerId).offset().top;
            console.log("mousestart:", mX, mY)
            // debugger
            var childs = els.parent().children();
            var brothers = []
            for (var i = 1; i < childs.length; i++) {
                if (childs[i] !== els[0])
                    brothers.push(childs[i])
            }
            brothersinfo = []
            brothers.forEach(function (item) {
                //parseInt的作用在于把'10px'变成'10'
                brothersinfo.push({ 'left': parseInt(item.style.left), 'top': parseInt(item.style.top), 'id': item.id })
            })
            console.log(brothersinfo)

            if (!isInterset(mX, mY, els)) {
                console.log("判定结果不相交")
            } else {
                console.log("判定结果相交")
                els.remove();
                //如果相交则回到原位
                // targetdiv.css("top", mY + 'px')
                // targetdiv.css("left", mX + 'px')
                // targetdiv.style.top = dY + 'px'
                // targetdiv.style.left = dX + 'px'
            }
        }

        //判断是否重叠
        function isIntersetmovesize(endx, endy, ev) {
            var endx = endx;
            var endy = endy;
            var ev = ev;
            try {
                //forEach无法跳出循环。只能用try的方法
                brothersinfo.forEach(function (item) {
                    // debugger
                    // console.log(ev)
                    //obj2在obj1的上面 obj2.top+obj2.height<obj1.top 
                    //obj2在obj1的下面 obj2.top>obj1.top+obj1.height 
                    //obj2在obj1的左面 obj2.left+obj2.width<obj1.left 
                    //obj2在obj1的右面 obj2.left>obj1.left+obj1.width
                    // debugger
                    var btop = item.top
                    var bleft = item.left
                    // console.log(ftop,fleft,btop,bleft)
                    // console.log('在obj上',ftop+300<btop)
                    // console.log('在obj下',ftop>btop+300)
                    // console.log('在obj左',fleft+400<bleft)
                    // console.log('在obj右',fleft>bleft+400)
                    //console.log(ftop+300<btop||ftop>btop+300||fleft+400<bleft||fleft>bleft+400)
                    // if (ftop + 300 < btop || ftop > btop + 300 || fleft + 400 < bleft || fleft > bleft + 400) {
                    if (endy < btop ||
                        endy - ev.height() > btop + $("#" + item.id).height() ||
                        endx - ev.width() > bleft + $("#" + item.id).width() ||
                        endx < bleft) {
                        console.log("和所有兄弟都不相交")
                    } else {
                        console.log("和某个兄弟相交:", item.id)
                        throw new Error("yes")
                    }
                })
            } catch (e) {
                if (e.message === "yes") { return true }
            }
            return false
        }

        //判断是否重叠
        function isInterset(endx, endy, ev) {
            var endx = endx;
            var endy = endy;
            var ev = ev;
            try {
                //forEach无法跳出循环。只能用try的方法
                brothersinfo.forEach(function (item) {
                    // debugger
                    // console.log(ev)
                    //obj2在obj1的上面 obj2.top+obj2.height<obj1.top 
                    //obj2在obj1的下面 obj2.top>obj1.top+obj1.height 
                    //obj2在obj1的左面 obj2.left+obj2.width<obj1.left 
                    //obj2在obj1的右面 obj2.left>obj1.left+obj1.width
                    // debugger
                    var btop = item.top
                    var bleft = item.left
                    // console.log(ftop,fleft,btop,bleft)
                    // console.log('在obj上',ftop+300<btop)
                    // console.log('在obj下',ftop>btop+300)
                    // console.log('在obj左',fleft+400<bleft)
                    // console.log('在obj右',fleft>bleft+400)
                    //console.log(ftop+300<btop||ftop>btop+300||fleft+400<bleft||fleft>bleft+400)
                    // if (ftop + 300 < btop || ftop > btop + 300 || fleft + 400 < bleft || fleft > bleft + 400) {
                    if (endy + ev.height() < btop ||
                        endy > btop + $("#" + item.id).height() ||
                        endx + ev.width() < bleft ||
                        endx > bleft + $("#" + item.id).width()) {
                        console.log("和所有兄弟都不相交")
                    } else {
                        console.log("和某个兄弟相交:", item.id)
                        throw new Error("yes")
                    }
                })
            } catch (e) {
                if (e.message === "yes") { return true }
            }
            return false
        }

        function getMousePos(event) {
            var e = event || window.event;
            return { 'x': e.clientX, 'y': e.clientY }
        }


    })();

}


