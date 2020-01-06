cola(function (model) {
  // 上海初始化标识：是否完成厂牌查询
  cola.model().set("isFinishCarBrandCodeQuery",false);
  // 上海初始化标识：是否完成平台车型查询
  cola.model().set("isFinishVehicleQuery",false);
  // 上海初始化标识：新车购置价是否可编辑，全国不可编辑
    //北京初始化 初登日期
    model.set("cdDate", '');

  model.set("shEditFlag",true);
    model.set("chaxuncdDate", '')
  // 上海初始化标识：是否二手车
  cola.model().set("shIsSecondHander",model.get("actuals").getFirst().get("plcCar05.secondhandcarflag"));
  model.set("checkNo","")//江苏交管唯一值
  model.set("codeInput","")//江苏交管验证输入
  model.set("JGflag",'0')
  model.set("benifitPeo",false);
  model.set("carUsingShow",false);
  model.set("shenZhenHidden",true);//深圳需隐藏的内容
  model.set("oLdlocalpurchaseprice", ""); 
  if(model.get("actuals").getFirst().get("productCode") === "0515") {
    model.set("benifitPeo",true);
  }
    var urlParams=cola.util.queryParams();


  console.log("urlParams:", urlParams)
  model.action({
    //续保车辆类型带出为null方法
    renewinsurance:function(){
      if (model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K01') {
        model.set("actual.plcCar05.vehiclestyleName",'9坐（含）以下且排量1.0升（含）以下的乘用车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='G01'){
        model.set("actual.plcCar05.vehiclestyleName",'挂车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='H01'){
        model.set("actual.plcCar05.vehiclestyleName",'商用车货车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K03'){
        model.set("actual.plcCar05.vehiclestyleName",'9坐（含）以下且排量1.6升以上至2.0升(含)的乘用车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K02'){
        model.set("actual.plcCar05.vehiclestyleName",'9坐（含）以下且排量1.0升以上至1.6升(含)的乘用车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K04'){
        model.set("actual.plcCar05.vehiclestyleName",'9坐（含）以下且排量2.0升以上至2.5升(含)的乘用车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K05'){
        model.set("actual.plcCar05.vehiclestyleName",'9坐（含）以下且排量2.5升以上至3.0升(含)的乘用车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K06'){
        model.set("actual.plcCar05.vehiclestyleName",'9坐（含）以下且排量3.0升以上至4.0升(含)的乘用车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K07'){
        model.set("actual.plcCar05.vehiclestyleName",'9坐（含）以下且排量4.0升（含）以上的乘用车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K08'){
        model.set("actual.plcCar05.vehiclestyleName",'核定载客人数9人以上20人以下中型客车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='K09'){
        model.set("actual.plcCar05.vehiclestyleName",'核定载客人数20人(含)以上大型客车,包括电车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='M01'){
        model.set("actual.plcCar05.vehiclestyleName",'两、三轮摩托车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='M02'){
        model.set("actual.plcCar05.vehiclestyleName",'轻便摩托车')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='X01'){
        model.set("actual.plcCar05.vehiclestyleName",'新能源车辆1')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='X02'){
        model.set("actual.plcCar05.vehiclestyleName",'新能源车辆2')
      }else if(model.get("actual.plcCar05.vehiclestyleName") == null && model.get("actual.plcCar05.vehiclestyle")=='Z01'){
        model.set("actual.plcCar05.vehiclestyleName",'专用作业车、轮式专业机械车')
      }else{
        return;
      }
    }
  })
    //北京个性化需求
    model.set("MsgQry", urlParams.msg_qry);
    model.set("rbCode", urlParams.rbCode);
    var msgqry = model.get("MsgQry")? model.get("MsgQry") : "0" ;
  //var msgqry = "1" ;

    //获取当前登录机构
    var loginCode="";
    tool.getCurrentLoginInfo(function(datab){
        loginCode = datab.currentLoginStructure.structureId.substring(0,2);
    })

    if (msgqry == "1"  && loginCode=="11") {
    	model.set("Msgqry",true);
    } else {
    	model.set("Msgqry",false);
    }
    
    var urls = "controller/contract/jyVhlplatform/getVhlSummary?from={{$from}}&limit={{$limit}}&productCode="+model.get("actuals").getFirst().get("productCode")
    if(msgqry == "0" ){
        $("#qurytest").css("display","block");
        $("#qurytestbjpt").css("display","none");
    }else if(msgqry == "1" && loginCode=="11"){
        $("#qurytestbjpt").css("display","block");
        $("#qurytest").css("display","none");
        urls = "controller/contract/jyVhlplatform/getVehicle?from=0&limit=10&productCode="+model.get("actuals").getFirst().get("productCode")
        if (urlParams.resultKey != undefined) {
          $.ajax({
            url:"controller/contractcenter/beijing/getSaveCarMessage",
            type: "POST",
            data: {
              actualId: urlParams.resultKey
            },
            success: function (data) {

              console.log("data:",data)
              if (data) {
                if (urlParams.dataCopy && urlParams.dataCopy == "Y") {
                  model.get("actual.plcCar05").set("carUserNatureCode", data.carUserNatureCode);//车辆使用性质
                  model.get("actual.plcCar05").set("vehiclestyle", data.vehicleType);//行驶证车辆类型
                } else {
                  model.set("noCopyDataVehicleType", data.vehicleType);//不数据复用行驶证车辆类型
                  model.set("diplayVehicleType", true);//不数据复用行驶证车辆类型提示字显示
                }
                   model.set("cdDate", data.enrollDate);
                    model.get("actual.plcCar05").set("enrollDate", data.enrollDate);//初登日期
                    model.get("actual.plcCar05").set("licensePlateNo", data.licensePlateNo);//号牌号码
                    model.get("actual.plcCar05").set("licenseType", data.licenseType);//号牌种类
                    model.get("actual.plcCar05").set("licenseName", data.licenseName);//号牌种类名字
                    // model.get("actual.plcCar05").set("carUserNatureCode", data.carUserNatureCode);//车辆使用性质
                    model.get("actual.plcCar05").set("frameNo", data.frameNo);//车架号
                    model.get("actual.plcCar05").set("engineNumber", data.engineNo);//发动机号
                    model.get("actual.plcCar05").set("owner", data.carowner);//车主
                    model.get("actual.plcCar05").set("carowner", data.carowner);//车主

                    model.get("actual.plcCar05").set("passengersNumber", data.passengersNumber);//荷载人数
                    model.get("actuals").current.get("plcCar05").set("seatcount",data.passengersNumber);//荷载人数
                    // model.get("actual.plcCar05").set("vehiclestyle", data.vehicleType);//行驶证车辆类型
                    model.get("actual.plcCar05").set("haulage", data.haulage);//准牵引总质量
                    model.get("actual.plcCar05").set("brandName", data.brandName);//车辆品牌
                    model.get("actual.plcCar05").set("colorcode", data.colorcode);//车辆颜色code
                    model.get("actual.plcCar05").set("colorName", data.colorName);//车辆颜色名字
                    model.get("actual.plcCar05").set("carBrandCode", data.vehiclecode);//厂牌型号显示车型代码
                    model.get("actual.plcCar05").set("vehiclecode", data.vehiclecode);//车型代码
                    // model.get("actual.plcCar05").set("vehicleId", data.vehiclecode);//车型代码
                    model.get("actual.plcCar05").set("vinNo", data.frameNo);//厂牌型号显示车型代码
                    // model.get("actual.plcCar05").set("standardName", data.standardName);//车型名称
              }
                model.get("actual.plcCar05").set("enrollDate", model.get("cdDate"));//初登日期
                console.log("帽子数据：", model.get("actual.plcCar05").toJSON())
            }
          })
        }
  }


  var carUsingFlag;
  //黑龙江开关,使用性质选择“营业公路客运”时，页面展示“车辆用途”下拉选择域
  var productCode = model.get("actuals").getFirst().get("productCode");
  var justMelt=/^[06uy]$/;
  $.ajax({
    url:"controller/contract/carNetInfoQuery/carUsingFlag?productCode="+productCode,
    type: "GET",
    async:true,
    contentType: "application/json",
    success:function(data) {
      carUsingFlag = data;
      if(carUsingFlag){
    	  var carUserNatureName = model.get('rolePath.carUserNatureCode');
          if(carUserNatureName=="9C"){
            model.set("carUsingShow",true);
          }else{
            model.set("carUsingShow",false);
          }
      }
    }
  })

  if(productCode == "0507"){
      model.set("specialCarFlag",true);
  }

  if(productCode == "0511"){
    console.log(model.get("actuals").getFirst().get("productCode"))
    model.action.renewinsurance();
 }


  var vehicleTypes =  cola.util.dictionary('vehicleType');
  if(carUsingFlag){
    debugger
    // 车辆用途做过滤针对黑龙江省
    var arrOther = ['01','02','03','06','07'];
    vehicleTypes = vehicleTypes.filter(function(a){
      return !($.inArray(a.key, arrOther) > -1);
    });

    vehicleTypes[1].value = "旅游客运";
  }
  model.set("vehicleTypesd", vehicleTypes);

  if(model.get("actuals").getFirst().get("isAppTraffic")!="1"){
    App.setFieldVisible($(".trafficQuoteNoNo"), false, true);//隐藏
  }

  model.watch("actuals.plcCar05.enrollDate",function(){
	  contractEntity.getUserYears(model);
  });
  var arrVehicleUseNatureAll = [];
  var handoverSearchFlag = "";
  //出租租赁控制
  var carUserNatureName = model.get("actuals.plcCar05.carUserNatureCode");
  if(carUserNatureName=="9A"){
    $(".carLeaseType").removeClass("display-none")
  }else{
    $(".carLeaseType").addClass("display-none");
    model.get('rolePath').set("leaseType","")
  }
  if(urlParams.flag == "auto"){
    //model.set("licensePlateNo",true);
    //model.set("newCarFlag",true);
    if(urlParams.newCarFlag){
      model.get("actual.plcCar05").set("newCarFlag",urlParams.newCarFlag);
    }
      var loginCode="";
      tool.getCurrentLoginInfo(function(datab){
          if (datab) {
              if(datab.currentLoginStructure){
                  loginCode = datab.currentLoginStructure.structureId;
              }
          }
      });
      //是否上牌 0:是 1:否
      if(urlParams.newCarFlag == "0" && urlParams.licensePlateNo != undefined && urlParams.licensePlateNo != null){
          model.get("actual.plcCar05").set("licensePlateNo",urlParams.licensePlateNo);
          model.get("actual.plcCar05").set("licenseType",urlParams.licenseType);
          model.get("actual.plcCar05").set("licenseName",urlParams.licenseName);
      }
      //北京地区旧车
      if(urlParams.newCarFlag == "0" && loginCode.substring(0,2)=='11'){
          if (urlParams.frameNo != undefined && urlParams.frameNo != null) {
              model.get("actual.plcCar05").set("frameNo",urlParams.frameNo.toUpperCase());
          }
          if (urlParams.carEngineNo != undefined && urlParams.carEngineNo != null) {
              model.get("actual.plcCar05").set("engineNumber",urlParams.carEngineNo.toUpperCase());
          }
          if (urlParams.licenseType != undefined && urlParams.licenseType != null) {
              model.get("actual.plcCar05").set("licenseType",urlParams.licenseType);
              model.get("actual.plcCar05").set("licenseName",urlParams.licenseName);
          }
      }
  }

    if (loginCode.substring(0,2) == '11') {
        //页面初始化回显vin码
        model.set("actual.plcCar05.vinNo", model.get("actual.plcCar05.frameNo"))
    }

  var vehicleType = model.get("rolePath.carKindCode"); // 获取进入页面车辆种类初始值
  model.set("underwritingViewFlag",false);
  // 过户批改进入也面前默认可填写
  model.set("correctsTheTransferShow",false);
  model.set("showInput",false);
  model.set("isShow",false);
  model.set("vehiclestyleList",[])

  //if(window.location.href.indexOf("productMoto")>-1){
  //    ;
  //    model.get("rolePath").set("carUserNatureCode","8A")
  //}
	//从保单中心-保单查询进入的标志
	if("true" == urlParams.viewInquiryFlag || "underwriting" == urlParams.menuFlag) {
		model.set("isCarDataSearch","true");
	} else {
		model.set("isCarDataSearch","");
	}
  if(model.get("actuals").getFirst().get("businessType") == "62" && !urlParams.viewInquiryFlag && window.location.href.indexOf("underwritingView") <=-1){
    if(model.get("actuals").getFirst().get("plcCar05.enrollDate") && model.get("actuals").getFirst().get("plcCar05.certificateDate")){
      if(model.get("actuals").getFirst().get("plcCar05.enrollDate").getTime() !=model.get("actuals").getFirst().get("plcCar05.certificateDate").getTime()){
        cola.alert("该车可能是过户车！")
      }
    }
  }
  if(!urlParams.endorseType){
    if(model.get("actuals").getFirst().get("productCode") =="0513"){
      model.set("showInput",true);
      model.set("productMotoFlag",true);
      if(!model.get("actuals").getFirst().get("plcCar05.carUserNatureCode")){
        model.get("actuals").getFirst().get("plcCar05").set("carUserNatureCode","8A");
        model.get("actuals").getFirst().get("plcCar05").set("carUserNature","家庭自用");
      }
      //model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCI","FT6");
      //model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCodeCI","摩托车拖拉机-不浮动");
      //model.set("rateFloatTypeCIFlag",true);
    }else{
      if(model.get("actuals").getFirst().get("plcCar05.newCarFlag") == '1'){
        //if(!model.get("actuals").getFirst().get("plcCar05.rateFloatTypeCI")){
        //    model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCI","FT2");
        //    model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCodeCI","新车-不浮动");
        //}
      }else{
        //if(!model.get("actuals").getFirst().get("plcCar05.rateFloatTypeCI")){
        //    model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCI","FT1");
        //    model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCodeCI","浮动");
        //}
      }
    }
  }
  //刚进页面获取发动机号及车架号的值
  model.set("che","")
  model.set("che1","")
  model.set("fad","")
  model.set("fad2","")
  model.get("actuals").current.get("plcCar05").set("itemNo",1);
  //单双号标志
  model.set("oddEvenMarkFlag",[
    {key:"04",value:"黄标车辆"},
    {key:"07",value:"特殊车辆"}
  ])
  // 获取登录机构
  var loginStructureCode;
  tool.getCurrentLoginInfo(function(datab){
    if (datab) {
      if(datab.currentLoginStructure){
        var province = datab.currentLoginStructure.structureId.split(0, 1);

        loginStructureCode = datab.currentLoginStructure.structureId;
        if(province == "37"){
          if(!model.get("actuals").getFirst().get("plcCar05.loanCarFlag")){
            model.get("actuals").getFirst().get("plcCar05").set("loanCarFlag",0);
          }
        }

        if(province == "11"){
          model.get("actual.plcCar05").dataType.getProperty("haulage").set("userData", [{visible: true}]);
          model.get("actual.plcCar05").dataType.getProperty("oddEvenMarkFlag").set("userData", [{visible: true}]);


                    model.set("carCertificateTyplay",true);
                    model.set("carCertificateNoplay",true);
                    model.set("certificateDateBJplay",true);
                    model.get("actual.plcCar05").dataType.getProperty("carCertificateNo").set("userData", [{visible: true}]);
                    model.get("actual.plcCar05").dataType.getProperty("certificateDateBJ").set("userData", [{visible: true}]);
                    model.get("actual.plcCar05").dataType.getProperty("carCertificateType").set("userData", [{visible: true}]);
                    if(urlParams.newCarFlag == "1"){

                      model.get('actual.plcCar05').dataType.getProperty("carCertificateNo").set("validators", [{$type: "required"}]);
                      model.get('actual.plcCar05').dataType.getProperty("certificateDateBJ").set("validators", [{$type: "required"}]);
                    }
                    model.get('actual.plcCar05').dataType.getProperty("carCertificateType").set("validators", [{$type: "required"}]);
                }
            }
        }
        //过滤能源种类的值;非北京显示01234;
        var arrOther = ['0','1','2','3','4'];//非北京
        var energyTypesCodeFiltereds =  cola.util.dictionary('EnergyTypesCode');
        if(loginStructureCode.substring(0,2)=='11'){//是否为北京
            model.get("actuals").getFirst().get("plcCar05").set("energyTypesCode", "A")
            energyTypesCodeFiltereds = energyTypesCodeFiltereds.filter(function(a){
                return !($.inArray(a.key, arrOther) > -1);
            });
        }else{
            energyTypesCodeFiltereds = energyTypesCodeFiltereds.filter(function(a){
                return $.inArray(a.key, arrOther) > -1;
            });
        }
        model.set("energyTypesCodeFiltered", energyTypesCodeFiltereds);
        //判断vin预填还是精准服务
        /*var arrVIN = "11,12,22,31,32,34,41,44,4403,50,51,53,54,62,64,";//vin的机构

	    (arrVIN.indexOf(loginStructureCode.substring(0,2))>-1
	    		||arrVIN.indexOf(loginStructureCode.substring(0,4))>-1)?showVIN=true:showJZ=true;
	    model.set("showVIN", showVIN);
	    model.set("showJZ", showJZ);*/
	    var showVIN = false;
	    var showJZ = false;
	    // 判断当前机构是vin预填还是精准
	    if('31'!=loginStructureCode.substring(0,2)){
	    	$.ajax({
				url:"controller/contract/vinQuery/vinOrJZ?loginStructureCode="+loginStructureCode,
				type: "POST",
				success: function (data) {
					data ? showVIN=true :showJZ=true;
					 model.set("showVIN", showVIN);
					 model.set("showJZ", showJZ);
				}
		    })
	    }else{
	    	//上海默认隐藏
	    	model.set("showVIN", false);
			model.set("showJZ", false);
      }

	})


  //刚进页面获取车辆种类和车辆初登日期
  model.set("chez","");
  model.set("chez1","");
  model.set("chud","");
  model.set("chud1","");

  var structureId = model.get("$currentUserInfo").structureId;
  //刚进页面校验山东交管信息按钮是否显示
  $.ajax({
    url:"controller/contract/carNetInfoQuery/queryHandoverModelInfo",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      businessOffice: structureId,
      productCode: model.get("actuals").getFirst().get("productCode")
    }),
    success: function (data) {
      // true 显示
      if(data){
        model.set("handoverDataSearch",true)
      } else {
        model.set("handoverDataSearch",false)
      }
    }
  })

  var productCode = model.get("actuals").getFirst().get("productCode");
  //四川地区运输型拖拉机是否特殊处理
  if((productCode && productCode=="0507")){
    $.ajax({
      url:"controller/contract/carNetInfoQuery/checkSpecialTractorInfo",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        businessOffice: loginStructureCode,
        productCode: productCode
      }),
      success: function (data) {
        var ifSpecialTractorFlag = false;
        // true 显示
        if(data){
          model.set("ifSpecialTractorFlag",(ifSpecialTractorFlag=true));
        } else {
          model.set("ifSpecialTractorFlag",(ifSpecialTractorFlag=false));
        }
        var carKindCode = model.get("actuals").getFirst().get("plcCar05.carKindCode");
        var enrollDate = model.get("actuals").getFirst().get("plcCar05").get("enrollDate");
        var date = new Date("2013-02-01");
        if(ifSpecialTractorFlag){
          if(carKindCode == "J2" && enrollDate.getTime() < date.getTime() ){
            model.set("isShow",true);
          }else{
            model.set("isShow",false);
          }
        }else{
          model.set("isShow",false);
        }
      }
    })
  }

  //==============================

  //控制核保时条款为只读状态
  if(window.location.href.indexOf("underwritingView")>-1){
    model.set("underwritingViewFlag",true)
  }

  //======================================
    model.set("carCertificateType",[]);

    // 优化 -----   杨逍
    if (model.get("carKindCodeArr") && model.get("carKindCodeArr").toJSON().length == 0) {
        model.set("carKindCodeArr", []);
        arrList("CarKindCode")
    }
    if (model.get("vehicleUseNatureArr") && model.get("vehicleUseNatureArr").toJSON().length == 0) {
        model.set("vehicleUseNatureArr", []);
        arrList("VehicleUseNature")
    }
    if (model.get("licenseColorCodeArr") && model.get("licenseColorCodeArr").toJSON().length == 0) {
        model.set("licenseColorCodeArr", []);
        arrList("LicenseColorCode")
    }

    // var arrItem = ["CarKindCode","VehicleUseNature","LicenseColorCode"];
    // arrItem.forEach(function(item){
    //   arrList(item)
    // });
    function arrList(num){
        var productCode = model.get("actuals").current.get("productCode");
        $.ajax({
            url: "controller/basecode/codeDetail/findCachedCodeDetails?baseCodeId="+num,
            type: "POST",
            async:false,
            contentType: "application/json",
            data:JSON.stringify({
                productCode:productCode
            }),
            success: function (data) {
                var params = cola.util.queryParams();   //交商联合的险种05130507
                var arr = [];
                var insurancename=model.get("actuals").current.get("productCode"); //判断当前险种
                data.forEach(function(item,index){
                    var keyname= {key:item.kind};
                    if(loginStructureCode.substring(0,2)=='32' && (insurancename=='0507' || params.productCode=='0513,0507') ){
                        arr.push({key:item.kind,value:item.name});
                    }else{
                        if((keyname.key)=="J3" || (keyname.key)=="J4" ||  (keyname.key)=="J5"  ){
                            delete keyname['key'];
                        }else{
                            arr.push({key:item.kind,value:item.name})
                        }
                    }
                    if(num =="VehicleUseNature"){
                        model.get("arrVehicleUseNatureAll").insert({key:item.kind,value:item.name});
                        arrVehicleUseNatureAll.push({key:item.kind,value:item.name})
                    }
                });
                if(num == "CarKindCode"){
                    model.set("carKindCodeArr",arr);
                }else if(num == "VehicleUseNature"){
                    model.set("vehicleUseNatureArr",arr);
                }else if(num == "LicenseColorCode"){
                    model.set("licenseColorCodeArr",arr);
                }
            }
        });
    }

    if (!model.get("licenseTypeArr")) {
        licenseType("LicenseType05");
    }
    function licenseType(licenseType){
        var productCode = model.get("actuals").current.get("businessOffice");
        $.ajax({
            url: "controller/basecode/codeDetail/findCachedCodeDetails?baseCodeId="+licenseType,
            type: "POST",
            contentType: "application/json",
            data:JSON.stringify({
                productCode:productCode
            }),
            success: function (data) {
                var arr = [];
                data.forEach(function(item,index){
                    arr.push({key:item.kind,value:item.name})
                })
                model.set("licenseTypeArr",arr);
            }
        });
    }
  //获取车辆来历凭证种类 carCertificateType
  model.set("carCertificateType",[
    {
      key: "01",
      value:"销售发票"
    },
    {
      key:"02",
      value:"法院调解书"
    },
    {
      key:"03",
      value:"法院裁定书"
    },
    {
      key:"04",
      value:"法院判决书"
    },
    {
      key:"05",
      value:"仲裁裁决书"
    },
    {
      key:"06",
      value:"相关文书（继承、赠予、协议抵债）"
    },
    {
      key:"07",
      value:"批准文件"
    },
    {
      key:"08",
      value:"调拨证明"
    },
    {
      key:"09",
      value:"修理发票"
    }
  ]);

  //新增北京机构 车辆来历凭证种类赋值默认值位 01-销售发票
  if(loginStructureCode.substring(0,2)=='11'){//是否为北京
    var plcCar=model.get("actuals").getFirst().get("plcCar05");
    plcCar.set("carCertificateType","01");
    plcCar.set("carCertificateTypeName","销售发票");
  }

  //按赔款次数确定费率等级
  var businessStructureId = "00000000";
    if (model.get("accordPaymentRateLevelarr") && model.get("accordPaymentRateLevelarr").toJSON().length == 0) {
        model.set("accordPaymentRateLevelarr", []);
        carInformationFn("accordPaymentRateLevel");
    
    }
    //carInformationFn("accordPaymentRateLevel");
  function carInformationFn(nums){
    tool.getCurrentLoginInfo(function (datab) {
      if(datab) {
        if(datab.currentLoginStructure){
          var province = datab.currentLoginStructure.structureId.split(0, 1);
          if(province == "11" || province == "44" || province == "35"){
            businessStructureId = datab.currentLoginStructure.structureId;
          }
          var productCode = model.get("actuals").current.get("productCode");
          $.ajax({
            url: "controller/basecode/codeDetail/findCachedCodeDetails?baseCodeId="+"accordPaymentRateLevel",
            type: "POST",
            contentType: "application/json",
            data:JSON.stringify({
              businessStructureId:businessStructureId
            }),
            success: function (data) {
              data.forEach(function(item,index){
                model.get("accordPaymentRateLevelarr").insert({key:item.kind,value:item.name})
              })
            }
          });
        }
      }
    });
  }
  //产地种类初始化数据
  model.set("speciesOriginCode",[
    {key:"全部",value:"全部"},
    {key:"2",value:"进口"},
    {key:"0",value:"国产"},
    {key:"1",value:"合资"}
  ]);
  //号牌号码赋值
  model.set("numberAssignment",'');
  //类型名称初始化数据
  model.set("carKindCode",[
    {key:"全部",value:"全部"},
    {key:"轿车类",value:"轿车类"},
    {key:"越野车类",value:"越野车类"},
    {key:"轻型货车类",value:"轻型货车类"},
    {key:"套牌车类",value:"套牌车类"},
    {key:"旅行车类",value:"旅行车类"},
    {key:"货车类",value:"货车类"},
    {key:"特种车类",value:"特种车类"},
    {key:"大型客车类",value:"大型客车类"},
    {key:"微型车类",value:"微型车类"},
    {key:"拖拉机类",value:"拖拉机类"},
    {key:"摩托车类",value:"摩托车类"},
    {key:"农用车类",value:"农用车类"}
  ])
  // 标的信息初始化数据
  /*model.set("standardInformationPopup",{
        licensePlateNo: "",
        carKindCode: "",
        frameNo: "",
        engineType: "",
        licenseType:"",
        licenseKind:""
    });*/
  model.set("standardInformationPopup",[]);
  /*model.set("standardInformationPopup",{
        "license":"",//license,
        "licenseType":"",//licenseType,
        "frameNo":"",//frameNo,
        "engineCode":"",//engineCode,
        "vehicleVariety":"",//vehicleVariety,
        "usage":"",//usage,
        "carBrandCode":"",

        "partyid":"",//partyid,
        "licenseFlag":"",//licenseFlag,
        "licenseName":"",//licenseName,
        "vin":"",//vin,
        "specialFlag":"",//specialFlag,
        "vehicleLicense":"",//vehicleLicense,
        "licenseColor":"",//licenseColor,
        "rbCode":"",//rbCode,
        "loadQuality":"",//loadQuality,
        "power":"",//power,
        "passengerCapacity":"",//passengerCapacity,
        "totalWeight":"",//totalWeight,
        "fuelType":"",//fuelType,
        "initialRegistrationTime":"",//initialRegistrationTime,
        "certificationTime":"",//certificationTime,
        "purchaseTime":"",//purchaseTime,
        "carLoan":"",//carLoan,
        "searchProofTime":""//searchProofTime
    });*/
  //  厂牌查询弹出框初始化数据
  model.set("labelTypeQueryTwo",{
    standardName: "",
    searchCode: "",
    companyName: "",
    brandName: "",
    familyName: "",
    vinCode: "",
    rbCode: "",
    importFlag: "",
    vehicleClass: "",
    listUserHistoryFlag: ""
  });
  //车型详细信息初始化数据
  model.set("rolePathDetail",{
    "rbCode":"",
    "standardName":"",
    "vehicleAlias":"",
    "vehicleClass":"",
    "vinCode":"",
    "riskFlag":"",
    "marketDate":"",
    "stopFlag":"",
    "familyName":"",
    "importFlag":"",
    "fullWeightMax":"",
    "fullWeightMin":"",
    "tonnage":"",
    "seat":"",
    "seatMin":"",
    "seatMax":"",
    "displacement":"",
    "power":"",
    "alienVhl":"",
    "remark":"",
    "companyName":"",
    "brandName":"",
    "gearboxType":"",
    "engineDesc":"",
    "batholith":"",
    "rateException":"",
    "rate":"",
    "rateSpecializeRepair":"",
    "rateVEHRiskRepair":"",
    "rateVEHRiskChange":"",
    "purchasePrice":"",
    "purchasePriceTax":"",
    "kindRedPrice":"",
    "kindRedPriceTax":"",
    "searchCode":"",
    "rbCode":"",
    "syxClassName":"",
    "jqxClassName":"",
    "absFlag":"",
    "airBagNum":"",
    "antiTheft":""
  });
  //vin初始化数据
  model.set("vinQuery",[])
  model.describe("labelTypeQuery", {
    provider: {
      url: urls,
      method: "POST",
      loadMode: "manual",
      pageSize: 10,
      parameter: "{{labelTypeQueryTwo}}",
      sendJson: true,
      response: function (self, arg) {

        $(".waittingRenderBox").css("display","none");
        //$("#carBrandCode c-table").css("height","150px");
        model.set("labelTypeQueryTwo.listUserHistoryFlag", "");
        var result = arg.result;
        result = JSON.parse(result);
        $(result.data$).each(function(i,n){
          //产地种类 countryNature
          n.importFlag = importFlag(n);
          //风险说明
          n.riskFlag = riskFlag(n);
        });
        //detailInformation(data) ;
        if(result && result.data$ && result.data$.length == 0){
          contractEntity.appAlert("没有查询到结果，请输入其他查询条件！");
        }
        arg.result=result;

        if(model.get("MsgQry")=="1"){//北京调用
          // detailInformation(arg.result.data$[0]) ;
        }
      },error:function(){
        $(".waittingRenderBox").css("display","none");
      }
    }
  });
  //单双号标志
  model.set("signNum",[
    {key:"04",value:"黄标车辆"},
    {key:"07",value:"特殊车辆"}
  ])
  //条款数据改变新车购置价
  window.changeLocalpurchasepriceInput=function(data) {
    model.get("rolePath").set("localpurchaseprice",data);
    model.get("rolePath").set("purchaseprice",data);
    model.get("rolePath").set("origincarprice",data)
  };
  window.notSpecialCarFlag = function(){
    model.get("rolePath").set("specialCarFlag","0")
  }
  model.set("viewInquiryItem",{
    rbCode:""
  })
  // 车联网权限校验初始化 start

  $.ajax({
    url:"controller/contract/carNetInfoQuery/checkCiCarModelGrade",
    type: "POST",
    async:true,
    contentType: "application/json",
    data: JSON.stringify({
      businessOffice: loginStructureCode,
      productCode: model.get("actuals").getFirst().get("productCode")
    }),
    success: function (data) {
      // true 显示
      if(data){
        model.set("carDataSearch",true)
      } else {
        model.set("carDataSearch",false)
      }
    }
  });

  // 车联网权限校验初始化 end
  function settime() {
    var count = 10;
    var resend = setInterval(function(){
      count--;
      if (count > 0){
        cola.tag("jsdisabled").set("disabled",true);
      }else {
        cola.tag("jsdisabled").set("disabled",false);
        clearInterval(resend);
      }
    }, 1000);
  }
  //厂牌查询平台车辆信息查询唐匡确定按钮
  function carModelOKButton () {
    var data = model.get("labelTypeQuery").current.toJSON()
    console.log(model.get("labelTypeQuery").current.toJSON())
    if (urlParams.dataCopy && urlParams.dataCopy == "Y") {

      if (model.get("actual.plcCar05.carUserNatureCode") == null) {model.get("actual.plcCar05").set("carUserNatureCode", data.carUserNatureCode)};//车辆使用性质
      if (model.get("actual.plcCar05.vehiclestyle") == null) {model.get("actual.plcCar05").set("vehiclestyle", data.vehicleType);}//行驶证车辆类型
    }
    if (model.get("actual.plcCar05.licensePlateNo") == null) {model.get("actual.plcCar05").set("licensePlateNo", data.licensePlateNo);}//号牌号码
    if (model.get("actual.plcCar05.licenseType") == null) {model.get("actual.plcCar05").set("licenseType", data.licenseType);}//号牌种类
    if (model.get("actual.plcCar05.frameNo") == null) {model.get("actual.plcCar05").set("frameNo", data.frameNo);}//车架号
    if (model.get("actual.plcCar05.engineNumber") == null) {model.get("actual.plcCar05").set("engineNumber", data.engineNo);}//发动机号
    if (model.get("actual.plcCar05.owner") == null) {model.get("actual.plcCar05").set("licensePlateNo", data.carowner);}//车主
    // if (model.get("actual.plcCar05.enrollDate") == null) {}//初登日期
      model.get("actual.plcCar05").set("enrollDate", model.get("actual.plcCar05.enrollDate"))
    if (model.get("actual.plcCar05.passengersNumber") == null) {model.get("actual.plcCar05").set("passengersNumber", data.passengersNumber);}//荷载人数
    if (model.get("actual.plcCar05.haulage") == null) {model.get("actual.plcCar05").set("haulage", data.haulage);}//准牵引总质量
    if (model.get("actual.plcCar05.colorcode") == null) {model.get("actual.plcCar05").set("colorcode", data.colorcode);}//车辆颜色code
    if (model.get("actual.plcCar05.colorName") == null) {model.get("actual.plcCar05").set("colorName", data.colorName);}//车辆颜色名字
    if (model.get("actual.plcCar05.exhaustscale") == null) {model.get("actual.plcCar05").set("exhaustscale", data.displacement);}//排量
    if (model.get("actual.plcCar05.enginePower") == null) {model.get("actual.plcCar05").set("enginePower", data.power);}//功率
    if (model.get("actual.plcCar05.speciesOrigin") == null) {model.get("actual.plcCar05").set("speciesOrigin", data.importFlag);}//产地种类名字
    if (model.get("actual.plcCar05.speciesOriginCode") == null) {model.set("actual.plcCar05.speciesOriginCode", importFlag(data));}//产地种类代码
    model.set("actual.plcCar05.localpurchaseprice", data.purchasePrice);//新车购价
    if (model.get("actual.plcCar05.vehiclecode") == null) {model.get("actual.plcCar05").set("vehiclecode", data.vehiclecode);}//车型代码
    if (model.get("actual.plcCar05.vehicleId") == null) {model.get("actual.plcCar05").set("vehicleId", data.vehiclecode);}//车型代码
    if (model.get("actual.plcCar05.vehicleQuality") == null) {model.get("actual.plcCar05").set("vehicleQuality", data.fullWeightMax);}//整备质量

    if (model.get("actual.plcCar05.deptName") == null) {model.get("actual.plcCar05").set("deptName", data.familyName);}//车型代码
    if (model.get("actual.plcCar05.tradeName") == null) {model.get("actual.plcCar05").set("tradeName", data.companyName);}//车型代码

    model.get("actual.plcCar05").set("platModelName",data.platModelName)//车型名称
    model.get("actual.plcCar05").set("vehiclestyledesc", data.standardName);//车辆类型描述
    model.get("actual.plcCar05").set("vehicleTonnage", data.tonnage);//载重量
    model.get("actual.plcCar05").set("registModel", data.vehicleClass);//行驶证车型
    model.get("actual.plcCar05").set("carBrandCode", data.standardName);//厂牌型号
      model.get("actual.plcCar05").set("localModelCode", data.rbCode);//车型代码
      model.get("actual.plcCar05").set("vehicleId", data.rbCode);//车型代码
      if (model.get("actual.plcCar05.vehicleId") == null) {model.get("actual.plcCar05").set("vehicleId", data.vehiclecode);}//车型代码
    // 计算车辆实际价值
    contractEntity.realityValue();
    cola.widget("carBrandCode").hide();
  }


  model.watch("actual.plcCar05.passengersNumber", function() {
      if(model.get("actual.plcCar05.passengersNumber")<"6") {
        if (model.get("actual.plcCar05.carUserNatureCode") == "9B" || model.get("actual.plcCar05.carUserNatureCode") == "9C") {
          cola.alert("核定载客人需大于6人")
        }
      }
  })
  model.watch("actual.plcCar05.carUserNatureCode", function() {
    if(model.get("actual.plcCar05.carUserNatureCode") == "9B" || model.get("actual.plcCar05.carUserNatureCode") == "9C") {
      if (model.get("actual.plcCar05.passengersNumber")<"6") {
        cola.alert("核定载客人需大于6人")
      }
    }
  })

  //初等日期值与发证日期如果不是一天的话判断二手车标识是还是否
  model.watch("actual.plcCar05.enrollDate",function(){
    if(loginStructureCode.split(0, 1) == "31"){
    if((model.get("actual.plcCar05.certificateDate")!=null || model.get("actual.plcCar05.certificateDate")!=undefined)){
        if(model.get("actual.plcCar05.certificateDate").getFullYear()!==model.get("actual.plcCar05.enrollDate").getFullYear()||model.get("actual.plcCar05.certificateDate").getMonth()!==model.get("actual.plcCar05.enrollDate").getMonth()||model.get("actual.plcCar05.certificateDate").getDate()!==model.get("actual.plcCar05.enrollDate").getDate()){
          model.set("actuals.plcCar05.secondhandcarflag",1);
        }else{
          model.set("actuals.plcCar05.secondhandcarflag",0);
        }
     }
    }
   
})
  model.watch("actual.plcCar05.certificateDate",function(){
    if(loginStructureCode.split(0, 1) == "31"){
      if(model.get("actual.plcCar05.certificateDate").getFullYear()!==model.get("actual.plcCar05.enrollDate").getFullYear()||model.get("actual.plcCar05.certificateDate").getMonth()!==model.get("actual.plcCar05.enrollDate").getMonth()||model.get("actual.plcCar05.certificateDate").getDate()!==model.get("actual.plcCar05.enrollDate").getDate()){
        model.set("actuals.plcCar05.secondhandcarflag",1);
        
      }

    }
})
  model.action({
    //reset: function (dom) {
    //
    //    $(dom).parents("c-input").children("input").val("")
    //},

    //江苏交管点击事件获取验证码（江苏交管）
    getVerficationNo:function(){
      model.set("JGflag","1")
      cola.model().set("JSflag","1")
      var vinNo = model.get("actual.plcCar05.frameNo");
      var licensePlateNo = urlParams.licensePlateNo;
      $.ajax({
        url:"service/platform/platformjoint/jiangsu/trafficVehicleInquiryVerification?licensePlateNo="+licensePlateNo+"&vinNo="+vinNo,
        type: "GET",
        async:false,
        contentType: "application/json",
        data: {},
        success: function (code) {
          var replacecheckCode = code.checkCode
          var checkNo=code.checkNo
          var reg = '/n/+/g,"%2B"';
          var msg='data:image/jpeg;base64,';
          var regcheckCode=msg+replacecheckCode.replace(reg,"");
          model.set("mycode",regcheckCode);
          model.set("checkNo",checkNo)
        }
      })
      settime()
    },
    //江苏交管提交查询事件江苏交管
    searrchCarData:function(){
      checkNo=model.get("checkNo");
      codeInput=model.get("codeInput")
      var actualId = urlParams.actualId;
      $.ajax({
        url:"service/platform/platformjoint/jiangsu/trafficVehicleInquiryConfirmation?checkNo="+checkNo+"&checkCode="+codeInput+"&actualId="+actualId,
        type: "GET",
        async:false,
        contentType: "application/json",
        data:{},
        success: function (data) {
          if(data.errorMsg){
            cola.alert(data.errorMsg)
            cola.widget("jsVehicleQuery").hide();
            return false
          }
          cola.widget("jsVehicleQuery").hide();
          cola.widget("jsMsgQuery").show();


          model.set("JSdata",{
            "carMark":data.carMark,
            "rackNo":data.rackNo,
            "vehicleStyle":data.vehicleStyle,
            "vehicleType":data.vehicleType,
            "engineNo":data.engineNo,
            "pmUseType":data.pmUseType,
            "ineffectualDate":data.ineffectualDate,
            "rejectDate":data.rejectDate,
            "transferDate":data.transferDate,
            "vehicleRegisterDate":data.vehicleRegisterDate,
            "lastCheckDate":data.lastCheckDate,
            "wholeWeight":data.wholeWeight,
            "limitLoadPerson":data.limitLoadPerson,
            "limitLoad":data.limitLoad,
            "madeFactory":data.madeFactory,
            "vehicleModel":data.vehicleModel,
            "displacement":data.displacement,
            "vehicleBrand1":data.vehicleBrand1,
            "vehicleBrand2":data.vehicleBrand2,
            "haulage":data.haulage,
            "salePrice":data.salePrice,
            "energyTypesCode":model.get("actual.plcCar05.energyTypesCode"),
            "status":data.status,
            "vehicleCategory":data.vehicleCategory,
            "owner":data.owner,
            "useType":data.useType,
            "color":data.color,
          })
            model.set("actual.plcCar05.checkNo",data.checkNo)
        }
      });

    },
    fillInJSDetails:function(){
      cola.widget("jsMsgQuery").hide();
      debugger
      if(model.get("JSdata.vehicleRegisterDate")!="0" && model.get("JSdata.vehicleRegisterDate")!=null && model.get("JSdata.vehicleRegisterDate")!=""){
        var timer= model.get("JSdata.vehicleRegisterDate").replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3") + " 00:00:00"
        model.set("actual.plcCar05.enrollDate",new Date(timer))
        model.set("actual.plcCar05.enrollDate",new Date(timer))
        model.set("jsenrollDateFlag",true)
      }
      if((model.get("JSdata.displacement")/1000)!="0" && (model.get("JSdata.displacement")/1000)!=null && (model.get("JSdata.displacement")/1000)!=""){
        model.set("actual.plcCar05.exhaustscale",(model.get("JSdata.displacement")/1000));
        model.set("jsexhaustscaleFlag",true)
      }
      if(model.get("JSdata.limitLoadPerson")!="0" && model.get("JSdata.limitLoadPerson")!=null && model.get("JSdata.limitLoadPerson")!="") {
        model.set("actual.plcCar05.passengersNumber",model.get("JSdata.limitLoadPerson"))
        model.set("jspassengersNumberFlag", true)
      }
      if(model.get("JSdata.wholeWeight")!="0" && model.get("JSdata.wholeWeight")!=null && model.get("JSdata.wholeWeight")!="") {
        model.set("actual.plcCar05.vehicleQuality",model.get("JSdata.wholeWeight"))
        model.set("jsvehicleQualityFlag", true)
      }
      if(model.get("JSdata.vehicleStyle")!="0" && model.get("JSdata.vehicleStyle")!=null && model.get("JSdata.vehicleStyle")!="") {
        model.set("rolePath.vehiclestyle",model.get("JSdata.vehicleStyle"))
        model.set("rolePath.vehiclestyleName",vehicleStyleFlag(model.get("JSdata.vehicleStyle")))
        model.set("jsvehiclestyleFlag",true)
      }
      if(model.get("JSdata.engineNo")!="0" && model.get("JSdata.engineNo")!=null && model.get("JSdata.engineNo")!=""){
        model.set("actual.plcCar05.engineNumber",model.get("JSdata.engineNo"));
        model.set("jsengineNumberFlag",true)
      }
      if(model.get("JSdata.vehicleType")!="0" && model.get("JSdata.vehicleType")!=null && model.get("JSdata.vehicleType")!=""){
        model.set("rolePath.licenseName",licenseTypeFlag(model.get("JSdata.vehicleType")))
        model.set("rolePath.licenseType",model.get("JSdata.vehicleType"))
        model.set("jslicenseTypeFlag",true)
      }

      if(model.get("JSdata.owner")!=""){
        cola.model().set("customerNameJsText","江苏交管返回车主名称："+model.get("JSdata.owner"))
      }else {
        cola.model().set("customerNameJsText","")
      }
    },




    //受益人联动是否贷款车
    loanCarFlagFn:function(data){
      model.get("doFee").set("doPlcEngage",false);
      $.ajax({
        url:"controller/policy/endorseVehicle/getUserInfo",
        type: "GET",
        async:false,
        contentType: "application/json",
        data: {},
        success: function (datab) {
          if (datab) {
            if(datab.currentLoginStructure){
              var province = datab.currentLoginStructure.structureId.split(0, 1);
              if(province == "37"){
                if(datab){
                  model.get("actuals").getFirst().get("plcCar05").set("loanCarFlag",1);
                }else{
                  model.get("actuals").getFirst().get("plcCar05").set("loanCarFlag",0);
                }
              }
            }
          }
        }
      })
    },
    //键盘按下事件
    applicantEnters:function(self, arg){
      var index = $('.applicantModelName').index($(self.getDom())) // 车型名称
      var index = $('.applicantQuickCode').index($(self.getDom())) // 速查码
      var index = $('.applicantManufacturerName').index($(self.getDom())) // 厂商名称
      var index = $('.applicantTheBrandName').index($(self.getDom())) // 品牌名称
      var index = $('.applicantBrandName').index($(self.getDom())) // 车系名称
      var index = $('.applicantModelCcode').index($(self.getDom())) // 车型代码
      var index = $('.applicantModelNameVIN').index($(self.getDom())) // VIN代码
      var index = $('.applicantModelNameVIN').index($(self.getDom())) // VIN代码
      if(arg.keyCode==13){
        if(arg.event.target.value!=''){
          setTimeout(function(){
            $(".applicantBtncxsBtn").eq(index).trigger('click');
          },0);
        }
      }
    },

    //北京查询接口：点击该按钮时根据车辆查询返回的信息查询平台“车型及纯风险保费”查询接口，获取平台返回的车型代码，然后用平台返回的车型代码查询精友库，补全精友数据并进行展示
    carPlatQueryBeijing:function(){
      if (model.get("actual.plcCar05.carBrandCode") == null) {
        model.get("labelTypeQueryTwo").set("standardName", "")
      } else {
        model.get("labelTypeQueryTwo").set("standardName", model.get("actual.plcCar05.carBrandCode"))
      }

        model.flush("labelTypeQuery");
        cola.widget("carBrandCode").show();
        /*$.ajax({
            url: "controller/contract/getVhlSummary/getVehicle?from=0&limit=10&productCode="+model.get("actuals").getFirst().get("productCode"),
            type: "POST",
            contentType: "application/json",
            async: true,
            data: JSON.stringify(model.get("labelTypeQueryTwo")),
            success :function(qrymsg){//返回数据向页面赋值

                qrymsg = {
                    plcVehicleModelVO: JSON.parse(qrymsg).data$[0]
                };
                console.log(qrymsg)
                if(qrymsg){
                  // detailInformation(qrymsg) ;

                }
            }
        })*/
      /*var actulId = model.get("actuals").getFirst().get("actualId");
      $.ajax({
        url: "controller/contractcenter/beijing/modelsQuery" ,
        type: "POST",
        data: {"actulId":actulId },
        async: true,
        success: function(data_bj) { //rbCode车型代码
          model.set("labelTypeQueryTwo.rbCode",data_bj.rbCode) ;
          if(data_bj){
            /!*$.ajax({
                            url: "controller/contract/jyVhlplatform/getVhlSummary?from=0&limit=1&productCode="+model.get("actuals").getFirst().get("productCode"),
                            type: "POST",
                            contentType: "application/json",
                            async: true,
                            data: {"rbCode":data_bj},
                            success :function(qrymsg){//返回数据向页面赋值
                                if(qrymsg){
                                    model.set("actual.plcCar05",qrymsg) ;
                                }
                            }
                        })*!/
            model.flush("labelTypeQuery") ;
          }
        }
      })*/
    },

    //厂牌型号查询

    showCarBrandCode:function () {
      if(loginStructureCode.split(0, 1) == "32"&&licensePlateNo!=undefined){
        var licensePlateNo2=licensePlateNo.substr(0,1)
        if(licensePlateNo2=='苏') {
          if (model.get("JGflag") == "0") {
            cola.alert('请先点击交管车辆校验按钮')
            return false
          }
        }
      }
      var comCode = model.get("actuals").current.get("businessOffice");
      // 获取出单员精友车型查询历史记录
      model.set("labelTypeQueryTwo.listUserHistoryFlag", "1");
      model.flush("labelTypeQuery");
      // 弹出框样式设置
      $(".table-body").css("max-height","15em");
      $(".bordered").css("height:16em");
      if(urlParams.viewInquiryFlag || urlParams.businessNoType || urlParams.menuFlag == 'underwriting'){
        model.get("viewInquiryItem").set("rbCode",model.get("actuals").getFirst().get("plcCar05.rbCode"));
        model.action("showCarInforDetail")(model.get("viewInquiryItem"));
        $(".carInforDetailOkDisplay").css("display","none");
      }else{
        cola.widget("carBrandCode").show();
      }
    },
    //厂牌查询弹出框查询按钮
    labelTypeQueryMesg:function(){
      $(".waittingRenderBox").css("display","block");
      var labelTypeQueryTwo = model.get("labelTypeQueryTwo");
      model.flush("labelTypeQuery");
      $(".pager").css("display","block");
    },
    // 厂牌查询弹出框x按钮及取消按钮
    carBrandCodeHideDialog:function(self,arg){
      model.set("labelTypeQueryTwo",{
        standardName: "",
        searchCode: "",
        companyName: "",
        brandName: "",
        familyName: "",
        vinCode: "",
        rbCode: "",
        importFlag: "",
        vehicleClass: ""
      });
      model.set("labelTypeQuery",[])
      cola.widget("carBrandCode").hide();
    },
    // 厂牌查询弹出框重置按钮
    carBrandCodeHideRest:function(){
      model.set("labelTypeQueryTwo",{
        standardName: "",
        searchCode: "",
        companyName: "",
        brandName: "",
        familyName: "",
        vinCode: "",
        rbCode: "",
        importFlag: "",
        vehicleClass: ""
      });
      model.set("labelTypeQuery",[])
      model.set("vinQuery",[])
      $(".pager").css("display","none")
    },
    //厂牌查询弹出框确定按钮
    labelTypeQueryDetail:function(self,arg){
      if (msgqry == "1") {
        carModelOKButton();
        return
      }
      // 只要改变就禁用默认是-并弹框提示
      if(urlParams.endorseType=="999"){
        window.disableMethod() // 调用全程批改是否被-- 禁用
        if(model.get("actuals").current.get("plcCar05.isFullEndor")=="0"){
          contractEntity.appAlert("应从保险起期追溯全程保险期间的保费差额");
          model.get("actuals").current.get("plcCar05").set("isFullEndor","1");
        }
        //window.isFullEndorNone() //代办人禁用
      }
      var labelTypeQuery = arg.model.get("labelTypeQuery").current;
      var rBCode = labelTypeQuery.get("rbCode");
      var comCode = model.get("actuals").current.get("businessOffice");
      $.ajax({
        url: "controller/contract/jyVhlplatform/getVhlDetail?productCode="+model.get("actuals").getFirst().get("productCode")+"&actualId="+model.get("actuals").getFirst().get("actualId"),
        type: "POST",
        async: false,
        contentType: "application/json",
        data: JSON.stringify({
          rbCode: rBCode,
          comCode: comCode
        }),
        success: function (data) {
          cola.model().set("isFinishCarBrandCodeQuery",true);
          cola.model().set("isFinishVehicleQuery",false);

          cola.widget("carBrandCode").hide();
          cola.widget("carInforDetail").hide();
          var data = JSON.parse(data);
          detailInformation(data);
          if(urlParams.specId.split(',').length >1){
            window.modeCodeFn();
          }else{
            if((urlParams.specId.split(',').length == 1 && urlParams.specId.split(',').indexOf(contractEntity.trafficSpecId) ==-1)){
              window.modeCodeFn();
            }
          }

          var fuelCode = data.plcVehicleModelVO.fuelCode;
          var productCode = model.get("actuals").getFirst().get("productCode");
          var isAppTraffic = model.get("actuals.isAppTraffic");

          if((productCode && productCode=="0507")||(isAppTraffic && isAppTraffic=="1")){
            //校验是否根据车型代码进行减免税规则校验
            $.ajax({
              url:"controller/contract/jyVhlplatform/checkTaxGrade",
              type: "POST",
              async:false,
              contentType: "application/json",
              data: JSON.stringify({
                businessOffice: loginStructureCode,
                productCode: productCode
              }),
              success: function (data) {

                if(!data){

                  //如果纳税类型发生改变，则触发车船税纳税类型点击事件
                  var taxTypeCode = model.get("actuals").getLast().get("plcCarShipTax").get("taxTypeCode");
                  var taxChangeFlag = true;
                  if (loginStructureCode.substring(0,2) == '12') {
                	  taxChangeFlag = false;
                  }
                  var vehicleTaxModel = cola.widget("vehicleTax").get("contentModel");
                  //根据fuelCode判断，如果是新能源车则纳税类型是免税，节约能源车是减税
                  if ( fuelCode != null){
                    var firstChart = fuelCode.substring(0,1);
              	  	if (firstChart.toUpperCase() == "X"){//新能源车
                      App.alert("您投保的车辆是新能源车，车船税纳税纳税标志默认为免税");
                      model.get("actuals").getLast().get("plcCarShipTax").set("taxTypeCode", "3M");//纳税类型:免税
                      if (taxTypeCode != model.get("actuals").getLast().get("plcCarShipTax.taxTypeCode") && taxChangeFlag) {
                    	  vehicleTaxModel.action("changeTypeHandle")(model.get("actuals").getLast().get("plcCarShipTax"));
                      }
                      model.get("actuals").getLast().get("plcCarShipTax").set("baseTaxation", "E");//设置免税原因
                      model.get("actuals").getLast().get("plcCarShipTax").set("relifReason", "M7");//免税原因设置成:新能源汽车
                    }else if (firstChart.toUpperCase() == "J"){//节约能源车
                      App.alert("您投保的车辆是节约能源车，车船税纳税纳税标志默认为减税");
                      model.get("actuals").getLast().get("plcCarShipTax").set("taxTypeCode", "4J");//减税
                      if (taxTypeCode != model.get("actuals").getLast().get("plcCarShipTax.taxTypeCode") && taxChangeFlag) {
                    	  vehicleTaxModel.action("changeTypeHandle")(model.get("actuals").getLast().get("plcCarShipTax"));
                      }
                      model.get("actuals").getLast().get("plcCarShipTax").set("baseTaxation", "P");//按比例减免
                      model.get("actuals").getLast().get("plcCarShipTax").set("freeRate", "50");//减税比例 50%
                      model.get("actuals").getLast().get("plcCarShipTax").set("relifReason", "");//原因设置成空
                      cola.tag("freeRateTag").set("readonly", true);
                    }else{
                      model.get("actuals").getLast().get("plcCarShipTax").set("taxTypeCode", "1N");//默认纳税
                      if (taxTypeCode != model.get("actuals").getLast().get("plcCarShipTax.taxTypeCode") && taxChangeFlag) {
                    	  vehicleTaxModel.action("changeTypeHandle")(model.get("actuals").getLast().get("plcCarShipTax"));
                      }
                      model.get("actuals").getLast().get("plcCarShipTax").set("baseTaxation", "");
                      model.get("actuals").getLast().get("plcCarShipTax").set("relifReason", "");
                      model.get("actuals").getLast().get("plcCarShipTax").set("paidFreeCertificate", "");
                      model.get("actuals").getLast().get("plcCarShipTax").set("ktaxComcode", "");
                      model.get("actuals").getLast().get("plcCarShipTax").set("taxRelief", "");
                      model.get("actuals").getLast().get("plcCarShipTax").set("freeRateText", "");
                      model.get("actuals").getLast().get("plcCarShipTax").set("freeRate", "");
                    }
                  }else{
                    model.get("actuals").getLast().get("plcCarShipTax").set("taxTypeCode", "1N");//默认纳税
                    if (taxTypeCode != model.get("actuals").getLast().get("plcCarShipTax.taxTypeCode") && taxChangeFlag) {
                    	vehicleTaxModel.action("changeTypeHandle")(model.get("actuals").getLast().get("plcCarShipTax"));
                    }
                    model.get("actuals").getLast().get("plcCarShipTax").set("baseTaxation", "");
                    model.get("actuals").getLast().get("plcCarShipTax").set("relifReason", "");
                    model.get("actuals").getLast().get("plcCarShipTax").set("paidFreeCertificate", "");
                    model.get("actuals").getLast().get("plcCarShipTax").set("ktaxComcode", "");
                    model.get("actuals").getLast().get("plcCarShipTax").set("taxRelief", "");
                    model.get("actuals").getLast().get("plcCarShipTax").set("freeRateText", "");
                    model.get("actuals").getLast().get("plcCarShipTax").set("freeRate", "");
                  }
                }
              }
            })
          }
          model.action("carBrandCodeHideRest")();
          if(model.get("actuals").getFirst().get("productCode") == "0515"){
            model.get("actuals").getFirst().get("plcCar05").set("actualvalue",model.get("actuals").getFirst().get("plcCar05.localpurchaseprice"))
          }
          model.action("putUserRbCodeCache")(rBCode);

          var comCode = "";
          var comCode1 = "";
          var comCode2 = "";
          //获取当前登录机构
          tool.getCurrentLoginInfo(function(datab){
            comCode = datab.currentLoginStructure.structureId;
          })
          if (comCode != "" && comCode != null && comCode != undefined) {
            comCode1 = comCode.substring(0,2);
            comCode2 = comCode.substring(0,4);
          }
          if ("51" == comCode1) {
            //车辆查询按钮权限初始化校验，四川省
            model.action("carQuery")();
          }
          if ("44" == comCode1 && "4403" != comCode2) {
            //调用广东交管车辆查询
            model.action("carQueryGD")();
          }
        }
      })
      //变更厂牌型号，清空新车购置价历史信息
      model.set("oLdlocalpurchaseprice", ""); 
    },
    // 设置用户选中车型的缓存
    putUserRbCodeCache:function(rBCode){
      $.ajax({
        url: "controller/contract/jyVhlplatform/putUserRbCodeCache?rbCode="+rBCode,
        type: "POST",
        async: false,
        contentType: "application/json",
        data: "",
        response: function (data) {

        }
      })
    },
    //vin预填双击事件
    vinDetail:function(self,arg){
      var labelTypeQuery = arg.model.get("vinQuery").current;
      var rBCode = labelTypeQuery.get("rbCode");
      if(!rBCode){
        var rolePath = model.get("rolePath");
        var speciesOrigin = {"importFlag":labelTypeQuery.get("importFlag")};
        //行业车型代码 vehiclecode
        rolePath.set("vehiclecode",labelTypeQuery.get("platModelCode"));
        //公告型号 announcementModel
        rolePath.set("announcementModel",labelTypeQuery.get("fcVehicle"));
        //车型名称
        rolePath.set("platModelName",labelTypeQuery.get("platModelName"));
        //能源种类
        //rolePath.set("energyTypesCode",data.plcVehicleModelVO.fuelName);
        //厂牌型号
        rolePath.set("carBrandCode",labelTypeQuery.get("standardName"));
        //新车购置价
        rolePath.set("localpurchaseprice",labelTypeQuery.get("purchasePrice"));
        //产地种类
        rolePath.set("speciesOriginCode",importFlag(speciesOrigin));
        rolePath.set("speciesOrigin",speciesOrigin.importFlag);
        //核定载质量
        rolePath.set("vehicleTonnage",labelTypeQuery.get("tonnage"));
        rolePath.set("toncount",labelTypeQuery.get("tonnage"));
        //排量
        rolePath.set("exhaustscale",labelTypeQuery.get("displacement"));
        //功率
        rolePath.set("enginePower",labelTypeQuery.get("power"));
        //核定载客
        rolePath.set("passengersNumber",labelTypeQuery.get("seat"));
        //车辆品牌
        rolePath.set("brandName",labelTypeQuery.get("brandName"));
        //车辆类型描述
        rolePath.set("vehiclestyledesc",labelTypeQuery.get("standardName"));
        rolePath.set("deptName",labelTypeQuery.get("familyName"));
        rolePath.set("tradeName",labelTypeQuery.get("companyName"));
        //车型代码
        rolePath.set("vehicleId",labelTypeQuery.get("rbCode"));
        rolePath.set("rbCode",labelTypeQuery.get("rbCode"));
        //整备质量
        if(labelTypeQuery.get("fullWeightMin")){
          rolePath.set("vehicleQuality",labelTypeQuery.get("fullWeightMin"));
        }else{
          rolePath.set("vehicleQuality",labelTypeQuery.get("fullWeightMax"));
        }
        //分类代码
        rolePath.set("newClassCode", labelTypeQuery.get("newClassCode"));
        //分类名称
        rolePath.set("newClassName", labelTypeQuery.get("newClassName"));
        //风险标识
        rolePath.set("riskOtherFlag", labelTypeQuery.get("riskOtherFlag"));
        //风险标识名称
        rolePath.set("riskOtherName", labelTypeQuery.get("riskOtherName"));
        model.action("seatCountFn")();
        if(urlParams.specId.split(',').length >1){
          window.modeCodeFn();
        }else{
          if((urlParams.specId.split(',').length == 1 && urlParams.specId.split(',').indexOf(contractEntity.trafficSpecId) ==-1)){
            window.modeCodeFn();
          }
        }
        cola.widget("carVinCode").hide();
        model.action("carBrandCodeHideRest")();

        var comCode = "";
        var comCode1 = "";
        var comCode2 = "";
        //获取当前登录机构
        tool.getCurrentLoginInfo(function(datab){
          comCode = datab.currentLoginStructure.structureId;
        })
        if(comCode != "" && comCode != null && comCode != undefined){
          comCode1 = comCode.substring(0,2);
          comCode2 = comCode.substring(0,4);
        }
        if ("51" == comCode1) {
          model.action("carQuery")();
        }
        if ("44" == comCode1 && "4403" != comCode2) {
          //调用广东交管车辆查询
          model.action("carQueryGD")();
        }
      }else{
        var comCode = model.get("actuals").current.get("businessOffice");
        if(!comCode){
          contractEntity.appAlert("请选择业务归属部门！");
          return false;
        }
        $.ajax({
          url: "controller/contract/jyVhlplatform/getVhlDetail?productCode="+model.get("actuals").getFirst().get("productCode")+"&actualId="+model.get("actuals").getFirst().get("actualId"),
          type: "POST",
          async: false,
          contentType: "application/json",
          data: JSON.stringify({
            rbCode: rBCode,
            comCode: comCode
          }),
          success: function (data) {
            cola.widget("carVinCode").hide();
            var data = JSON.parse(data);
            detailInformation(data);
            if(urlParams.specId.split(',').length >1){
              window.modeCodeFn();
            }else{
              if((urlParams.specId.split(',').length == 1 && urlParams.specId.split(',').indexOf(contractEntity.trafficSpecId) ==-1)){
                window.modeCodeFn();
              }
            }
            model.action("carBrandCodeHideRest")();

            var comCode = "";
            var comCode1 = "";
            var comCode2 = "";
            //获取当前登录机构
            tool.getCurrentLoginInfo(function(datab){
              comCode = datab.currentLoginStructure.structureId;
            })
            if(comCode != "" && comCode != null && comCode != undefined){
              comCode1 = comCode.substring(0,2);
              comCode2 = comCode.substring(0,4);
            }
            if ("51" == comCode1) {
              //车辆查询按钮权限初始化校验，四川省
              model.action("carQuery")();
            }
            if ("44" == comCode1 && "4403" != comCode2) {
              //调用广东交管车辆查询
              model.action("carQueryGD")();
            }
          }
        })
      }
    },
    // 厂牌型号查询详细信息弹出框处理
    showCarInforDetail:function(item){
      var rBCode = item.get("rbCode");
      var comCode = model.get("actuals").current.get("businessOffice");
      $.ajax({
        url: "controller/contract/jyVhlplatform/getVhlDetail?productCode="+model.get("actuals").getFirst().get("productCode")+"&actualId="+model.get("actuals").getFirst().get("actualId"),
        type: "POST",
        async: false,
        contentType: "application/json",
        data: JSON.stringify({
          rbCode: rBCode,
          comCode: comCode
        }),
        success: function (data){
          var data = JSON.parse(data)
          data.plcVehicleModelVO.importFlag = importFlag(data.plcVehicleModelVO);
          data.plcVehicleModelVO.stopFlag = stopFlag(data.plcVehicleModelVO);
          data.plcVehicleModelVO.absFlag = absFlag(data.plcVehicleModelVO);
          data.plcVehicleModelVO.antiTheft = absFlag(data.plcVehicleModelVO);
          model.set("rolePathDetail",data.plcVehicleModelVO);
          cola.widget("carInforDetail").show();
        }
      })
    },
    //厂牌型号查询详细信息弹出框确定按钮
    carInforDetailOk:function(){
      //只要改变就禁用默认是-并弹框提示
      if(urlParams.endorseType=="999"){
        window.disableMethod() // 调用全程批改是否被-- 禁用
        model.get("actuals").current.get("plcCar05").set("isFullEndor","1");
        contractEntity.appAlert("应从保险起期追溯全程保险期间的保费差额");
      }
      cola.widget("carBrandCode").hide()
      cola.widget("carInforDetail").hide()
      cola.widget("carVinCode").hide()
      var rolePath = model.get("rolePath");
      var rolePathDetail = model.get("rolePathDetail");
      var speciesOriginCode = importFlag(model.get("rolePathDetail").toJSON());
      //行业车型代码 vehiclecode
      rolePath.set("vehiclecode",rolePathDetail.get("platModelCode"));
      //公告型号 announcementModel
      rolePath.set("announcementModel",rolePathDetail.get("fcVehicle"));
      //车型名称
      rolePath.set("platModelName",rolePathDetail.get("platModelName"));
      //能源种类
      //rolePath.set("energyTypesCode",rolePathDetail.get("fuelName"));
      //厂牌型号
      rolePath.set("carBrandCode",rolePathDetail.get("standardName"));
      //新车购置价
      rolePath.set("localpurchaseprice",rolePathDetail.get("purchasePrice"));
      //产地种类
      rolePath.set("speciesOrigin",rolePathDetail.get("importFlag"));
      rolePath.set("speciesOriginCode",speciesOriginCode);
      //核定载质量
      rolePath.set("vehicleTonnage",rolePathDetail.get("tonnage"));
      rolePath.set("tonnage",rolePathDetail.get("tonnage"));
      //排量
      rolePath.set("exhaustscale", rolePathDetail.get("displacement"));
      //功率
      rolePath.set("enginePower",rolePathDetail.get("power"));
      //核定载客
      if(model.get("actual.plcCar05.passengersNumber")!="0"||null) {
        rolePath.set("passengersNumber", rolePathDetail.get("seat"));
      }
      //车辆品牌
      rolePath.set("brandId",rolePathDetail.get("brandName"));
      //车辆类型描述
      rolePath.set("vehiclestyledesc",rolePathDetail.get("standardName"));
      //实际价值
      rolePath.set("vehicleId",rolePathDetail.get("rbCode"));
      rolePath.set("tradeName",rolePathDetail.get("companyName"));
      rolePath.set("deptName",rolePathDetail.get("familyName"));
      rolePath.set("rbCode",rolePathDetail.get("rbCode"));
      //整备质量
      if(rolePathDetail.fullWeightMin){
        if(model.get("actual.plcCar05.enginePower")!="0"||null) {
          rolePath.set("vehicleQuality", rolePathDetail.get("fullWeightMin"));
        }
      }else{
        if(model.get("actual.plcCar05.enginePower")!="0"||null) {
          rolePath.set("vehicleQuality", rolePathDetail.get("fullWeightMax"));
        }
      }
      if(urlParams.specId.split(',').length >1){
        window.modeCodeFn();
      }else{
        if((urlParams.specId.split(',').length == 1 && urlParams.specId.split(',').indexOf(contractEntity.trafficSpecId) ==-1)){
          window.modeCodeFn();
        }
      }
      model.action("seatCountFn")();
      model.action("carBrandCodeHideRest")();
    },
    //是否是新车未上牌
    newCarFlagFn:function(data){
      if(data.get("newCarFlag") == '1'){
        model.get("rolePath").set("licensePlateNo",model.get("numberAssignment"));
        //if(model.get("rolePath.licenseType")){
        //    model.get("rolePath").set("licenseType",'');
        //}
        //if(model.get("rolePath.licenseColorCode")){
        //    model.get("rolePath").set("licenseColorCode",'');
        //}
        model.get("rolePath").set("foreignCarFlag","0");
        model.action("engineNoFn")(model.get("rolePath"))
      }
      if(data.get("newCarFlag") == '0'){
        if(model.get("rolePath.licensePlateNo")){
          model.get("rolePath").set("licensePlateNo",'');
        }
        model.get("rolePath").set("foreignCarFlag","0");

      }
    },
    //是否是部队、武警、场院车辆和挂车事件
    copySpecialCarFlag:function(data){
      model.get("rolePath").set("isMarkVehicle",data.get("specialCarFlag"));
      var specialCarFlag =  data.get("specialCarFlag");
      window.isSpecialCarFlag(specialCarFlag)
    },

    //核定载质量带出吨位数事件
    copyTonCount: function(data){
      contractEntity.realityValue()
      //if(data.get("vehicleTonnage") == 0) {
      //    data.set("vehicleTonnage",null);
      //    App.alert("输入内容为数字");
      //    return false;
      //}
      model.get("rolePath").set("toncount",data.get("vehicleTonnage"))
      if(model.get("actuals").getFirst().get("productCode") == "0515"){
        model.get("actuals").getFirst().get("plcCar05").set("actualvalue",model.get("actuals").getFirst().get("plcCar05.localpurchaseprice"))
      }
    },
    //黑龙江省，使用性质选择“营业公路客运”时，页面展示“车辆用途”下拉选择域
    changeUsringCar:function() {
      // 获取车辆还用类型
      var carUserNatureName = model.get('rolePath.carUserNatureCode');

      if(carUsingFlag){
        //黑龙江省，使用性质选择“营业公路客运”时，页面展示“车辆用途”下拉选择域
        if(carUserNatureName=="9C"){
          model.set("carUsingShow",true);
          model.get("rolePath").set("carPurpose","04");
          model.get("rolePath").set("carPurposeName","公路客运");
        }else{
          model.set("carUsingShow",false);
        }
      }
      var nonAutoDataFlag = model.get("nonAutoDataFlag");
      var carUserNatureCode = model.get("actual.plcCar05.carUserNatureCode")
      if((urlParams.endorseType || window.location.href.indexOf("endorseRender")!=-1)
            && nonAutoDataFlag
            && carUserNatureCode && carUserNatureCode != "8A"){
              App.alert("本车辆有相关意外险保单，如有需要请到对应保单号下进行批改。");
              return;
        }
        if(loginStructureCode.substring(0, 2) == '50'){
          if(carUserNatureCode=="9A"){
            model.get('actual.plcCar05').dataType.getProperty("leaseType").set("validators", [{$type: "required"}]);
          }else if(carUserNatureCode!="9A"){
            model.get('actual.plcCar05').dataType.getProperty("leaseType").set("validators", []);
          }
        }
    },

    //车辆使用性质
    carUserNature:function(data){
      // 获取车辆种类
      var carKindName = model.get('rolePath.carKindCode')
      // 获取车辆还用类型
      var carUserNatureName = model.get('rolePath.carUserNatureCode');

      var isFullEndor = model.get("rolePath.isFullEndor");
      var carUserNatureCode = ["8A","8B","8C","8D"];

      // 车辆种类和使用性质对比判断
      if(carKindName && carUserNatureName) {
        $.ajax({
          url:"controller/contract/common/contrastiveVehicle",
          type: "GET",
          contentType: "application/json",
          data: {
            carKindCode:carKindName,
            carUserNatureCode:carUserNatureName
          },
          success:function(data) {
            if(data == "0"){
              cola.alert("使用性质和车辆种类不对应，请重新输入");
              // model.get("rolePath").set("carKindCode","");
              model.get("rolePath").set("carUserNatureCode","");
            }

          }
        })
      }
      if(window.location.href.indexOf("productTraffic")==-1 && window.location.href.indexOf("endorseTraffic")==-1){
        window.addEquipment();
      }
      contractEntity.realityValue();
      var carUserNatureCodeBd = model.get("carUserNatureCodeBB") // 初始的值

      var carUserNatureCodeB=data.get("carUserNatureCode")   // 变化后的值
      if(urlParams.endorseType=="999" && isFullEndor == "0"){
        if(carUserNatureCodeB!= carUserNatureCodeBd){ //如果有变化
          cola.confirm("是否全程批改？",{
            onApprove:function(){ //确认按钮
              model.get("actuals").current.get("plcCar05").set("isFullEndor","1")
              //window.disableMethod() // 调用全程批改是否被-- 禁用
              contractEntity.appAlert("应从保险起期追溯全程保险期间的保费差额");
              //window.isFullEndorNone()  // 代办人禁用
            },
            onDeny:function(){
            }
          });
        }else{
          model.get("actuals").current.get("plcCar05").set("isFullEndor","0")
          //window.isFullEndorSone() // 代办人不禁用
        }
      }
      if(carUserNatureName != "8A"){
        if(model.get("actuals").getFirst().get("productCode") != "0507"){
          window.removeDoubleRisk();
        }
      }
      if(carUserNatureCode.indexOf(carUserNatureName) <= -1){
        if(model.get("actuals").getFirst().get("productCode") != "0507"){
          window.removeEngine();
        }
      }
      //出租租赁控制
      if(carUserNatureName=="9A"){
        $(".carLeaseType").removeClass("display-none")
      }else{
        $(".carLeaseType").addClass("display-none");
        model.get('rolePath').set("leaseType","")
      }
    },
    speciesOriginCodeFuc:function(){

      var speciesOriginCode = model.get("actuals.plcCar05.speciesOriginCode");
      var value = model.get("doFee").get("glassChangeValue");
      if("B"==speciesOriginCode || "C"==speciesOriginCode){
        if(2 == model.get("doFee").get("glassChangeValue")){
          contractEntity.appAlert("国产车投保进口玻璃请注意!");
        }
        if(5 == value ){
          contractEntity.appAlert("国产车投保进口普通玻璃请注意!");
        }

        if(7 == value ){
          contractEntity.appAlert("国产车投保进口特种玻璃请注意!");
        }
      }
      if("A"==speciesOriginCode){
        if(1 == value ){
          contractEntity.appAlert("进口车投保国产玻璃请注意!");
        }
        if(4 == value ){
          contractEntity.appAlert("进口车投保国产普通玻璃请注意!");
        }
        if(6 == value ){
          contractEntity.appAlert("进口车投保国产特种玻璃请注意!");
        }
      }
    },

    //根据车辆种类判断按吨事件
    copyCarKind:function(rolePath){

      if(rolePath.get("vehiclestyle")){
        rolePath.set("vehiclestyle",'')
        rolePath.set("vehiclestyleName",'')
      }
      if(rolePath.get("carUserNatureCode")){
        rolePath.set("carUserNatureCode",'')
        rolePath.set("carUserNature",'')
      }
      var urlParams=cola.util.queryParams();
      var carKindCode = model.get("actuals").getFirst().get("plcCar05.carKindCode");
      if(carKindCode){
        if(urlParams.specId == "599502"){
          if(carKindCode.indexOf("J") == 0 || carKindCode == "M0" || carKindCode == "M1" || carKindCode == "M2" || carKindCode == "M3"){
            window.productMotoFlag()
          }else{
            window.productMotoFlagNot()
          }
        }
        if(carKindCode.indexOf("H1") == 0 || carKindCode.indexOf("J") == 0 || carKindCode.indexOf("M") == 0){
          model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCI","FT6");
          model.get("actuals").getFirst().get("plcCar05").set("rateFloatTypeCodeCI","摩托车拖拉机-不浮动");

        }
        if(window.location.href.indexOf("productMoto")>-1){
          rolePath.set("rateFloatTypeCI","FT6");
          rolePath.set("rateFloatTypeCodeCI","摩托车拖拉机-不浮动");
          if(model.get("rolePath").get("carKindCode") == "J1" || model.get("rolePath").get("carKindCode") == "J2"){
            model.get("rolePath").set("carUserNatureCode","8D");
            model.get("rolePath").set("carUserNature","非营业个人");
            model.get("actualTCI.plcCarShipTax") && model.get("actualTCI").set("plcCarShipTax.taxTypeCode","3M")
          }else{
            model.get("rolePath").set("carUserNatureCode","8A");
            model.get("rolePath").set("carUserNature","家庭自用");
            model.get("actualTCI.plcCarShipTax") && model.get("actualTCI").set("plcCarShipTax.taxTypeCode","1N")
          }

        }
      }
      // 获取车辆种类
      var carKindName = model.get('rolePath.carKindCode');
      // 获取车辆还用类型
      var carUserNatureName = model.get('rolePath.carUserNatureCode');
      // 车辆种类和使用性质对比判断
      if(carKindName && carUserNatureName) {
        $.ajax({
          url:"controller/contract/common/contrastiveVehicle",
          type: "GET",
          contentType: "application/json",
          data: {
            carKindCode:carKindName,
            carUserNatureCode:carUserNatureName
          },
          success:function(data) {
            if(data == "0"){
              cola.alert("使用性质和车辆种类不对应，请重新输入");
              model.get("rolePath").set("carKindCode","");
            }else{
              model.action("setDefaultTonCount")(carKindName)
              if(window.location.href.indexOf("productTraffic")==-1 && window.location.href.indexOf("endorseTraffic")==-1){
                window.addEquipment();
              }
              contractEntity.realityValue();
              if(model.get("actualTCI.plcCarShipTax")){
                if(data.carKindCode == "HO"){
                  model.get("actualTCI").set("plcCarShipTax.taxUnit","2");
                  model.get("actualTCI").set("plcCarShipTax.taxUnitText","货车按每吨计算")
                }else{
                  model.get("actualTCI").set("plcCarShipTax.taxUnit","1");
                  model.get("actualTCI").set("plcCarShipTax.taxUnitText","其他车辆按每车")
                }
              }

              //车辆种类、车辆初登日期，厂牌型号  变动强制转换为全程批改
              var zhi3=rolePath.get("carKindCode");
              if(model.get("chez")!==zhi3){
                model.set("chez1","false")
              }else{
                model.set("chez1","true")
              }
              if(window.location.href.indexOf("endorseRender")>-1 || window.location.href.indexOf("endorseTraffic")>-1){
                if(model.get("chez1")=="false"&&model.get("chud1")=="false"){
                  model.get("actuals").current.get("plcCar05").set("isFullEndor","0");
                  //window.isFullEndorSone()
                }else{
                  if(model.get("actuals").current.get("plcCar05.isFullEndor")=="0"){
                    contractEntity.appAlert("应从保险起期追溯全程保险期间的保费差额");
                    model.get("actuals").current.get("plcCar05").set("isFullEndor","1");
                  }
                  //window.isFullEndorNone();
                  // 判断车辆种类初始值和选择值是否相同
                  if(urlParams.endorseType=="999"){
                    if(model.get("chez")==zhi3){
                      window.disableMethodNo(); // 调用全程批改是否被-- 不禁用
                      //window.isFullEndorSone(); // 代办人不禁用
                    }else{
                      window.disableMethod(); // 调用全程批改是否被-- 禁用
                    }
                  }
                }
              }

            }
          }
        })
      } else{
        model.action("setDefaultTonCount")(carKindName)
      }
      var carKindCodeArr = ["G0","G1","G3","G4","G5"];
      if(carKindCodeArr.indexOf(carKindCode) >-1){
        if(model.get("actuals").getFirst().get("productCode") != "0507"){
          window.removeThree();
        }
      }
    },
    vehiclestyleRequest:function(){
      var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode")
      if(carKindCode){
        $.ajax({
          url:"controller/contract/cfgResultItem/findDrivingLicense?baseCodeId=vehiclestyle&parentId="+carKindCode,
          ttype: "POST",
          contentType: "application/json",
          success: function (data) {
            var list=[];
            data.forEach(function(item,index){
                if (loginStructureCode.substring(0, 2) == '11') {
                    if (item.kind != 'S') {
                        list.push({key:item.kind,value:item.name})
                    }
                } else {
                    list.push({key:item.kind,value:item.name})
                }

            });
            model.set("vehiclestyleList",list)
          },error:function(){
          }
        })
      }else{
        model.set("vehiclestyleList",[])
        contractEntity.appAlert("请先选择车辆种类！")
      }
    },
    vehicleUseNatureRequest:function(){
        var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode")
        var businessOffice=model.get("actual.businessOffice") ? model.get("actual.businessOffice") :
            (model.get("$currentUserInfo") ? model.get("$currentUserInfo.structureId") : "")
      if(carKindCode){
        $.ajax({
          url:"controller/contract/cfgResultItem/carAndUsingNature?baseCodeId=VehicleUseNature&parentId="+carKindCode+"&businessOffice="+businessOffice,
          ttype: "POST",
          contentType: "application/json",
          success: function (data) {
              var list=[]
              var insurancename=model.get("actuals").current.get("productCode");   //判断当前险种 0513&&50
              data.forEach(function(item,index){
               var kindname={key:item.kind}                                        //判断当前是否是9A
             	 if(loginStructureCode.substring(0,2)=='50' && insurancename=='0513' && (kindname.key)=='9A'){

              	}else {
              		list.push({key:item.kind,value:item.name});
              	}
              })
            model.set("vehicleUseNatureArr",list)
          },error:function(){
          }
        })
      }else{
        model.set("vehicleUseNatureArr",[])
        contractEntity.appAlert("请先选择车辆种类！")
      }
    },
    licenseTypeRequest:function(){
    	debugger
      var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode")
      if(carKindCode){
        $.ajax({
          url:"controller/contract/cfgResultItem/filterLicense?baseCodeId=LicenseType05&parentId="+carKindCode,
          ttype: "POST",
          contentType: "application/json",
          success: function (data) {

            var list=[]
            //江苏新增应急救援号牌种类
        	if (loginCode.substring(0,2) =='32') {
            	data.forEach(function(item,index){
            		list.push({key:item.kind,value:item.name})
            	})
            	model.set("licenseTypeList",list);
            } else {
            	data.forEach(function(item,index){
            		if (item.kind != "91"){
            			 list.push({key:item.kind,value:item.name})
            		}
            	})
            	model.set("licenseTypeList",list);
            }
          },error:function(){
          }
        })
      }else{
        model.set("licenseTypeList",[])
        contractEntity.appAlert("请先选择车辆种类！")
      }
    },
    //车辆种类为G2,T21北京地区核定载质量赋值
    setDefaultTonCount:function(carKindName){
      var product = ["0507","0511","0512"];
      if((carKindName =="G2" || carKindName == "T21") && product.indexOf(model.get("actuals").getFirst().get("productCode")) > -1 && !model.get("actuals").getFirst().get("plcCar05.vehicleTonnage")){
        $.ajax({
          url:"controller/policy/endorseVehicle/getUserInfo",
          type: "GET",
          contentType: "application/json",
          data: {},
          success: function (datab) {
            var organizationCode = datab.currentLoginStructure.structureId.substring(0,2);
            if(organizationCode == "11" && model.get("actuals").getFirst().get("plcCar05.newCarFlag") == "1"){
              model.get("actuals").getFirst().get("plcCar05").set("vehicleTonnage",10);
            }else{
              model.get("actuals").getFirst().get("plcCar05").set("vehicleTonnage","");
            }
          },error:function(){
          }
        })
      }
    },
    // 判断是否为外地车
    licensePlateNoFn:function(data){
      var licensePlateNo = data.get("licensePlateNo");
      if(licensePlateNo != null){
        var carFalse = false;
        licensePlateNo = licensePlateNo.toUpperCase().trim();
        //截取第一个字
        var licensePlateNoFast = licensePlateNo.substring(0,1);
        var dauStr = '';
        if(data.get("newCarFlag")==0){
          var urlParams=cola.util.queryParams();
          $.ajax({
            url:"controller/policy/endorseVehicle/getUserInfo",
            type: "GET",
            contentType: "application/json",
            data: {
              //actualId:urlParams.actualId,
              //flag:'1'
            },
            success: function (datab) {
              var organizationCode = datab.currentLoginStructure.structureId.substring(0,2)
              var city = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
              };
              if(organizationCode == "11") {//北京
                dauStr = "京";
              }else if(organizationCode == "12"){//天津
                dauStr = "津";
              } else if(organizationCode == "13") { // 河北------
                dauStr = "冀";
              } else if(organizationCode == "14") { // 山西
                dauStr = "晋";
              } else if(organizationCode == "15") {//内蒙古
                dauStr = "蒙";
              } else if(organizationCode == "21" ) {//辽宁
                dauStr = "辽";
              } else if(organizationCode == "22") {//吉林
                dauStr = "吉";
              } else if(organizationCode == "23") {//黑龙江
                dauStr = "黑";
              } else if(organizationCode == "31") {//上海
                dauStr = "沪";
              } else if(organizationCode == "32") {//江苏
                dauStr = "苏";
              } else if(organizationCode == "33") {//浙江
                dauStr = "浙";
              } else if(organizationCode == "34") {//安徽
                dauStr = "皖";
              } else if(organizationCode == "35") {//福建
                dauStr = "闽";
              } else if(organizationCode == "36") {//江西
                dauStr = "赣";
              } else if(organizationCode == "37") {//山东
                dauStr = "鲁";
              } else if(organizationCode == "41") {//河南
                dauStr = "豫";
              } else if(organizationCode == "42") {//湖北
                dauStr = "鄂";
              } else if(organizationCode == "43") {//湖南
                dauStr = "湘";
              } else if(organizationCode == "44") {//广东
                dauStr = "粤";
              } else if(organizationCode == "45") {//广西
                dauStr = "桂";
              } else if(organizationCode == "46") {//海南
                dauStr = "琼";
              } else if(organizationCode == "50") {//重庆
                dauStr = "渝";
              } else if(organizationCode == "51") {//四川
                dauStr = "川";
              } else if(organizationCode == "52") {//贵州
                dauStr = "黔";
              } else if(organizationCode == "53") {//云南
                dauStr = "滇";
              } else if(organizationCode == "54") {//西藏
                dauStr = "藏";
              } else if(organizationCode == "61") {//陕西
                dauStr = "陕";
              } else if(organizationCode == "62") {//甘肃
                dauStr = "甘";
              } else if(organizationCode == "63") {//青海
                return dauStr = "青";
              } else if(organizationCode == "64") {//宁夏
                dauStr = "宁";
              } else if(organizationCode == "65") {//新疆
                dauStr = "新";
              } else if(organizationCode == "71") {//台湾
                dauStr = "台";
              } else if(organizationCode == "81") {//香港
                dauStr = "港";
              } else if(organizationCode == "82") {//澳门
                dauStr = "澳";
              } else if(organizationCode == "91") {//国外
                dauStr = "外";
              }
              if(licensePlateNoFast == "京") {//北京
                carFalse = true
              }
              if(licensePlateNoFast == "津"){//天津
                carFalse = true
              }
              if(licensePlateNoFast == "冀") { // 河北------
                carFalse = true
              }
              if(licensePlateNoFast == "晋") { // 山西
                carFalse = true
              }
              if(licensePlateNoFast == "蒙") {//内蒙古
                carFalse = true
              }
              if(licensePlateNoFast == "辽" ) {//辽宁
                carFalse = true
              }
              if(licensePlateNoFast == "吉") {//吉林
                carFalse = true
              }
              if(licensePlateNoFast == "黑") {//黑龙江
                carFalse = true
              }
              if(licensePlateNoFast == "沪") {//上海
                carFalse = true
              }
              if(licensePlateNoFast == "苏") {//江苏
                carFalse = true
              }
              if(licensePlateNoFast == "浙") {//浙江
                carFalse = true
              }
              if(licensePlateNoFast == "皖") {//安徽
                carFalse = true
              }
              if(licensePlateNoFast == "闽") {//福建
                carFalse = true
              }
              if(licensePlateNoFast == "赣") {//江西
                carFalse = true
              }
              if(licensePlateNoFast == "鲁") {//山东
                carFalse = true
              }
              if(licensePlateNoFast == "豫") {//河南
                carFalse = true
              }
              if(licensePlateNoFast == "鄂") {//湖北
                carFalse = true
              }
              if(licensePlateNoFast == "湘") {//湖南
                carFalse = true
              }
              if(licensePlateNoFast == "粤") {//广东
                carFalse = true
              }
              if(licensePlateNoFast == "桂") {//广西
                carFalse = true
              }
              if(licensePlateNoFast == "琼") {//海南
                carFalse = true
              }
              if(licensePlateNoFast == "渝") {//重庆
                carFalse = true
              }
              if(licensePlateNoFast == "川") {//四川
                carFalse = true
              }
              if(licensePlateNoFast == "黔") {//贵州
                carFalse = true
              }
              if(licensePlateNoFast == "滇") {//云南
                carFalse = true
              }
              if(licensePlateNoFast == "藏") {//西藏
                carFalse = true
              }
              if(licensePlateNoFast == "陕") {//陕西
                carFalse = true
              }
              if(licensePlateNoFast == "甘") {//甘肃
                carFalse = true
              }
              if(licensePlateNoFast == "青") {//青海
                carFalse = true
              }
              if(licensePlateNoFast == "宁") {//宁夏
                carFalse = true
              }
              if(licensePlateNoFast == "新") {//新疆
                carFalse = true
              }
              if(licensePlateNoFast == "台") {//台湾
                carFalse = true
              }
              if(licensePlateNoFast == "港") {//香港
                carFalse = true
              }
              if(licensePlateNoFast == "澳") {//澳门
                carFalse = true
              }
              if(licensePlateNoFast == "外") {//国外
                carFalse = true
              }
              if(carFalse){
                if(licensePlateNoFast==dauStr){

                  model.get("rolePath").set("foreignCarFlag",0)
                }else {

                  model.get("rolePath").set("foreignCarFlag",1)
                }
              }

            },error:function(){

              cola.alert("判断失败")
            }
          })
        }
      }
      model.get("rolePath").set("licensePlateNo",licensePlateNo);
    },
    changeLicensePlaNo: function(){
      contractEntity.appAlert("请检查是否已上牌照！");
      var rolePath = model.get('rolePath');
      rolePath.set('itemCode','');
    },
    //车架号与Vin联动事件
    frameNoFn:function(data){
      var zhi2=data.get("frameNo");
      if(model.get("che")!==zhi2){
        model.set("che1","false")
      }else{
        model.set("che1","true")
      }
      if(window.location.href.indexOf("endorseTraffic")>-1 || window.location.href.indexOf("endorseRender")>-1){

        if(model.get("che1")=="false"&&model.get("fad1")=="false"){
          contractEntity.appAlert("发动机号、车架号同时批改，请核实是否更换保险标的！");
        }
      }
      var frameNo = data.get("frameNo");
        if (frameNo =='' || frameNo == null || frameNo.length <17 ){
            contractEntity.appAlert("车架号不足17位，请确认是否录入错误！");

        }
      if(frameNo !=null){
        frameNo = frameNo.toUpperCase().trim()
      }
      model.get("rolePath").set("frameNo",frameNo);
      model.get("rolePath").set("vinNo",data.get("frameNo"));
      var makeCom = model.get("actuals").getFirst().get("makeCom").substring(0,2);
      var carKindCode = model.get("actuals").getFirst().get("plcCar05.carKindCode");
      if(carKindCode==null||carKindCode==""){
        data.set("frameNo","");
        data.set("vinNo","");
        contractEntity.appAlert("请先选择车辆种类！");
        return;
      }
      if(makeCom=="45"&&carKindCode=="A0"){
        model.action("carInsurantFun")();
      }
    },
    //vin 自动转大写
    vinFn:function(data){
      var vinNo = data.get("vinNo");
      if(vinNo !=null){
        vinNo = vinNo.toUpperCase().trim()
      }
      model.get("rolePath").set("vinNo",vinNo)
    },
    //发动机号自动转大写
    engineNoFn:function(data){
      var zhi3=data.get("engineNumber");
      if(model.get("fad")!==zhi3){
        model.set("fad1","false")
      }else{
        model.set("fad1","true")
      }
      if(window.location.href.indexOf("endorseTraffic")>-1 || window.location.href.indexOf("endorseRender")>-1){

        if(model.get("che1")=="false"&&model.get("fad1")=="false"){
          contractEntity.appAlert("发动机号、车架号同时批改，请核实是否更换保险标的！");
        }
      }
      var engineNo = data.get("engineNumber");
      if(engineNo !=null){
        engineNo =  engineNo.toUpperCase().trim();
        var urlParams=cola.util.queryParams();
        if(urlParams.specId!="2251787"){
          var ownedStructureId = model.get("actual.businessOffice");
          if(ownedStructureId){
            if(data.get("newCarFlag")==1) {
              var newLicensePlateNo = data.get("engineNumber").toUpperCase().trim();
                var licensePlateNo =newLicensePlateNo.substring(newLicensePlateNo.length-10);
                data.set("licensePlateNo",licensePlateNo);
            }
          }else{
            contractEntity.appAlert("请先录入归属部门！");
            data.set("engineNumber","")
          }
        }
      }
      model.get("rolePath").set("engineNumber",engineNo);
    },
    buyDateFn:function(entity){
      entity.validate('enrollDate');
    },
    //发证日期等于初登日期
    enrollFn:function(data){
      //车辆种类、车辆初登日期，厂牌型号  变动强制转换为全程批改
      var checkCertificateDateFlag = model.get("checkCertificateDateFlag"),
        ifSpecialTractorFlag = model.get("ifSpecialTractorFlag");
      data.validate('buyDate');
      var carKindCode = model.get("actuals").getFirst().get("plcCar05.carKindCode");
      var enrollDate = data.get("enrollDate");
      var certificateDate = data.get("certificateDate");
      var date = new Date("2013-02-01");
      if(window.location.href.indexOf("endorseRender")>-1 || window.location.href.indexOf("endorseTraffic")>-1){
        if(model.get("chez1")=="false" && model.get("chud1")=="false"){
          model.get("actuals").current.get("plcCar05").set("isFullEndor","0");
          //window.isFullEndorSone()
        }else{
          if(model.get("actuals").current.get("plcCar05.isFullEndor")=="0"){
            contractEntity.appAlert("应从保险起期追溯全程保险期间的保费差额");
            model.get("actuals").current.get("plcCar05").set("isFullEndor","1");
          }
          //window.isFullEndorNone()
          // 判断车辆种类初始值和选择值是否相同
          if(urlParams.endorseType=="999"){
            var zhi4=data.get("enrollDate");
            var zhi5=model.get("chud").getTime()
            if(zhi5!==zhi4.getTime()){
              model.set("chud1","false")
            }else{
              model.set("chud1","true")
            }
            if(zhi5==zhi4.getTime()){
              window.disableMethodNo(); // 调用全程批改是否被-- 不禁用
              //window.isFullEndorSone()
            }else{
              window.disableMethod();// 调用全程批改是否被-- 禁用

            }
          }

        }
      }
      var compareResult = contractEntity.compareEnrollAndStartDate(model);
      if(compareResult != "" && compareResult != undefined){
        App.alert(compareResult);
      }
      contractEntity.realityValue();
      //发证日期随初登日期变化
      if(certificateDate == null){
        if(checkCertificateDateFlag != "-1"){
          model.get("rolePath").set("certificateDate",data.get("enrollDate"));
        }else{
          model.get("rolePath").set("certificateDate","");
        }
      }
      if(enrollDate && certificateDate){
        if((enrollDate.getFullYear()==certificateDate.getFullYear()) && (enrollDate.getMonth()==certificateDate.getMonth()) && (enrollDate.getDate()==certificateDate.getDate())){
          model.get("rolePath").set("chgownerflag",0);
          model.get("rolePath").set("specialVehicleTypesCode","0");
          model.get("rolePath").set("specialVehicleTypes","正常车辆");
        }else{
          model.get("rolePath").set("specialVehicleTypesCode","1");
          model.get("rolePath").set("specialVehicleTypes","车辆所有权转移重新投保");
          model.get("rolePath").set("chgownerflag",1);
//          contractEntity.appAlert("该车可能是过户车！");
          contractEntity.appAlert("该车疑似过户车！");
          // add start 发证日期随初登日期变化  需求 54141
          if(enrollDate > certificateDate){
              if(checkCertificateDateFlag != "-1"){
                model.get("rolePath").set("certificateDate",data.get("enrollDate"));
              }else{
                model.get("rolePath").set("certificateDate","");
              }
        	  contractEntity.appAlert("发证日期不得早于初登日期！");
          }
          //end start 发证日期随初登日期变化  需求 54141
        }
      }
      model.get("rolePath").set("buyDate",data.get("enrollDate"));
      contractEntity.getUserYears(model);
      model.set("secondHandCar",false);
      model.set("chgownerflag",false);
      //if(enrollDate != null && enrollDate != undefined){
       // model.set("actuals.plcCar05.transferdate",enrollDate);
      //}
      if(ifSpecialTractorFlag){
        if(carKindCode == "J2" && enrollDate.getTime() < date.getTime() ){
          model.set("isShow",true);
        }else{
          model.set("isShow",false);
        }
      }else{
        model.set("isShow",false);
      }

      //日期不同也可能不是过户车辆，所以此处不禁止修改
      //model.set("chgownerflag",true);

      //“开具车辆来历凭证所载日期(北京专用)”未录入时，如录入“车辆初等日期”，默认将“车辆初等日期”带入“开具车辆来历凭证所载日期”
      var certificateDateBJ = model.get("actuals").getFirst().get("plcCar05.certificateDateBJ");
      if(!certificateDateBJ){
        model.get("rolePath").set("certificateDateBJ",data.get("enrollDate"));
      }
    },
    //发证日期与初登日期不同,为过户，同时为二手车辆
    certificateFn:function(data){

      var lessMonth = 0;
      var enrollDate = data.get("enrollDate");
      var certificateDate = data.get("certificateDate");
      var newTime = contractEntity.getServiceTime();
      var starTim = newTime.setFullYear(newTime.getFullYear()-1, newTime.getMonth(), newTime.getDate());
      if(enrollDate && certificateDate){
        if((enrollDate.getFullYear()==certificateDate.getFullYear()) && (enrollDate.getMonth()==certificateDate.getMonth()) && (enrollDate.getDate()==certificateDate.getDate())){

          model.set("secondHandCar",true);
          model.set("chgownerflag",true)
        }else{
          model.set("secondHandCar",false);
          model.set("chgownerflag",false);
        }
        if(certificateDate < enrollDate){
          lessMonth = (certificateDate.getFullYear()-enrollDate.getFullYear())*12 + certificateDate.getMonth()-enrollDate.getMonth()-1;
          if(certificateDate.getFullYear()-enrollDate.getFullYear()<=0){
            model.get("rolePath").set("certificateDate",enrollDate);
//            contractEntity.appAlert("发证日期不能小于初登日期！");
            contractEntity.appAlert("发证日期不得早于初登日期！");
          }
        }else{
          lessMonth = (certificateDate.getFullYear()-enrollDate.getFullYear())*12 + certificateDate.getMonth()-enrollDate.getMonth();
        }
      }
      //过户批改时，发证日期不能晚于批改日期
      if(urlParams.endorseType=="97"){
        var endorseTime = model.get("actuals").current.get("endorseTime");
        if(data.get("certificateDate")>endorseTime){
          cola.alert("发证日期不能晚于批改日期");
          data.set("certificateDate","")
        }
      }else if(lessMonth>=2 && certificateDate>=new Date(starTim)){
        model.get("rolePath").set("chgownerflag",1);
        model.get("rolePath").set("secondhandcarflag",1);
        model.get("rolePath").set("specialVehicleTypesCode","1");
        model.get("rolePath").set("specialVehicleTypes","车辆所有权转移重新投保");
        //model.get("rolePath").set("rateFloatTypeCI","FT4");
        //model.get("rolePath").set("rateFloatTypeCodeCI","机动车所有权转移-不浮动");
//        contractEntity.appAlert("该车可能是过户车！");
        contractEntity.appAlert("该车疑似过户车！");
        //转移登记日期自动默认为发证日期
        var transferdateReadOnly = model.get("transferdate");
        if (!transferdateReadOnly) {
        	model.set("actuals.plcCar05.transferdate",certificateDate);
        }
      }else if(certificateDate > enrollDate){
        model.get("rolePath").set("specialVehicleTypesCode","1");
        model.get("rolePath").set("specialVehicleTypes","车辆所有权转移重新投保");
        model.get("rolePath").set("chgownerflag",1);
//        contractEntity.appAlert("该车可能是过户车！");
        contractEntity.appAlert("该车疑似过户车！");
        //如果转移登记日期为只读则不重新赋值(广东交管对接)
        var transferdateReadOnly = model.get("transferdate");
        //转移登记日期自动默认为发证日期
        if (!transferdateReadOnly) {
        	model.set("actuals.plcCar05.transferdate",certificateDate);
        }
      }else{
        model.get("rolePath").set("chgownerflag",0);
        model.get("rolePath").set("secondhandcarflag",0);
        model.get("rolePath").set("specialVehicleTypesCode","0");
        model.get("rolePath").set("specialVehicleTypes","正常车辆");
      }
      if(loginStructureCode.split(0, 1) == "31"){
        debugger;
        if(model.get("actual.plcCar05.certificateDate").getFullYear()!==model.get("actual.plcCar05.enrollDate").getFullYear()||model.get("actual.plcCar05.certificateDate").getMonth()!==model.get("actual.plcCar05.enrollDate").getMonth()||model.get("actual.plcCar05.certificateDate").getDate()!==model.get("actual.plcCar05.enrollDate").getDate()){
          model.set("actuals.plcCar05.secondhandcarflag",1);
             if(model.get("actual.startTime").getFullYear()==model.get("actual.plcCar05.certificateDate").getFullYear()){
                model.get("rolePath").set("chgownerflag",1);
               }
               if(model.get("actual.startTime").getFullYear()-model.get("actual.plcCar05.certificateDate").getFullYear()==1&&model.get("actual.plcCar05.certificateDate").getMonth()+1==model.get("actual.startTime").getMonth()+1&&model.get("actual.plcCar05.certificateDate").getDate()>=model.get("actual.startTime").getDate()){
                model.get("rolePath").set("chgownerflag",1);
               } if(model.get("actual.startTime").getFullYear()-model.get("actual.plcCar05.certificateDate").getFullYear()==1&&model.get("actual.plcCar05.certificateDate").getMonth()+1==model.get("actual.startTime").getMonth()+1&&model.get("actual.plcCar05.certificateDate").getDate()<model.get("actual.startTime").getDate()){
                model.get("rolePath").set("chgownerflag",0);
               }
               if(model.get("actual.startTime").getFullYear()-model.get("actual.plcCar05.certificateDate").getFullYear()==1&&model.get("actual.plcCar05.certificateDate").getMonth()+1<model.get("actual.startTime").getMonth()+1){
                model.get("rolePath").set("chgownerflag",0);
               }
        }
      }
    },
    chgownerflagFn:function(data){
      debugger;
      var certifyDate =  model.get("actuals").getFirst().get("plcCar05").get("certificateDate");
      if(data == 0){
        model.get("rolePath").set("specialVehicleTypesCode","0");
        model.get("rolePath").set("specialVehicleTypes","正常车辆");
      }else{
    	  //转移登记日期自动默认为发证日期
    	  if(certifyDate != null &&  certifyDate != undefined){
    		 var transferdateReadOnly = model.get("transferdate");
	         if (!transferdateReadOnly) {
        		model.set("actuals.plcCar05.transferdate",certifyDate);
        	 }
	       	 //model.set("actuals.plcCar05.transferdate",certifyDate);
	      }
        model.get("rolePath").set("specialVehicleTypesCode","1");
        model.get("rolePath").set("specialVehicleTypes","车辆所有权转移重新投保");
      }
      if(loginStructureCode.split(0, 1) == "31"){
        var certifyDate =  model.get("actuals").getFirst().get("plcCar05").get("certificateDate");
        if(data == 0){
          model.get("rolePath").set("specialVehicleTypesCode","0");
          model.get("rolePath").set("specialVehicleTypes","正常车辆");
        }else{
          //转移登记日期自动默认为发证日期
          if(certifyDate != null &&  certifyDate != undefined){
           var transferdateReadOnly = model.get("transferdate");
             if (!transferdateReadOnly) {
              model.set("actuals.plcCar05.transferdate",certifyDate);
             }
              //model.set("actuals.plcCar05.transferdate",certifyDate);
          }
          model.get("rolePath").set("specialVehicleTypesCode","1");
          model.get("rolePath").set("specialVehicleTypes","车辆所有权转移重新投保");
        }
      }
    },
    specialtractorflagFn:function(data){

    },
    seatCountFn:function(){
      if(window.location.href.indexOf("productTraffic")==-1 && window.location.href.indexOf("endorseTraffic")==-1){
        window.addEquipment();
      }
      contractEntity.realityValue();
      var chgownerflag = model.get("rolePath").get("passengersNumber");
      model.get("rolePath").set("seatcount",chgownerflag);
      if(["199863","2053140","2251503","2251787"].indexOf(urlParams.specId.split(",")[0]) != -1){
        window.passengerInsurance(chgownerflag);
      }
      if(model.get("actuals").getFirst().get("productCode") == "0515"){
        model.get("actuals").getFirst().get("plcCar05").set("actualvalue",model.get("actuals").getFirst().get("plcCar05.localpurchaseprice"))
      }
    },

    //显示和隐藏过户日期
    hideTransferdate:function(){
      var chgownerflag = model.get("rolePath").get("chgownerflag");
      if(chgownerflag == '1'){
        $("[property='transferdate']").css("display","")
      }else{
        $("[property='transferdate']").css("display","none")
      }
    },
    foldUpfold:function () {
      model.$(".carMoreMessage").toggle();
      //模块点击收起变文字及图片
      if(model.$(".foldMore").attr("data-flag")==1){
        model.$(".foldMore span").text("展开更多信息");
        model.$(".foldMore").attr("data-flag","0");
        model.$(".foldMore i").attr("class","caret down icon");
      }else{
        model.$(".foldMore span").text("收起更多信息");
        model.$(".foldMore").attr("data-flag","1");
        model.$(".foldMore i").attr("class","caret up icon");
      }

    },
    clearItemCode:function() {
      // debugger
      if(model.get('rolePath')){
        var rolePath = model.get('rolePath');
        rolePath.set('itemCode','');
      }
    	if(model.get("actual.plcCar05.carKindCode")!="" && model.get("actual.plcCar05.carKindCode")!=undefined && model.get("actual.plcCar05.carKindCode")!=null){
    		 var carKindCode=model.get("actual.plcCar05.carKindCode").substring(0, 1);
    	}
    	if(loginStructureCode !="" && loginStructureCode != undefined && loginStructureCode != null){
    		 var businessOffice=loginStructureCode.substring(0, 4)
    	}
      var productCode=model.get("actuals").current.get("productCode")
      $.ajax({
        url:"service/contract/autoplatform/platformLocalTaxConfig/findPlatformLocalTaxConfig?productCode="+productCode+"&businessOffice="+businessOffice+"&carKindCode="+carKindCode,
        type: "GET",
        async:false,
        contentType: "application/json",
        data: {},
        success: function (data) {
          if(data.localTaxFlag=="0"){
            cola.model().set("productMotoFlag",false)
          }else{
        	  cola.model().set("productMotoFlag",true)
          }
        }
      })
    },
    //查询车辆信息
    showCarInfoDetail:function () {

      var rolePath = model.get('rolePath');
      var licenseFlag = model.get('rolePath').get('newCarFlag');//是否已上牌
      var license = model.get('rolePath').get('licensePlateNo');//号牌号码
      if(licenseFlag == '0'){
        licenseFlag = 'Y';
      }else{
        licenseFlag = 'N';
      }
      var licenseType = model.get('rolePath').get('licenseType');//号牌种类
      var vehicleVariety = model.get('rolePath').get('carKindCode');//车辆种类
      var frameNo =  model.get('rolePath').get('frameNo');//车架号
      var engineCode =  model.get('rolePath').get('engineNumber');//发动机号
      if((license == "" || license == null || license == undefined) && (frameNo == "" || frameNo == null || frameNo == undefined) && (engineCode == "" || engineCode == null || engineCode == undefined)){
        contractEntity.appAlert("请至少输入车架号、车牌号码、发动机号其中一项！");
        return false;
      }
      var sourceStage;
      if(!urlParams.endorseType){
        sourceStage = "endorsementEntry";
      }else{
        sourceStage = "notAccessPlatform";
      }
      var params = {
        "licenseFlag": licenseFlag,
        "license": license,
        "licenseType": licenseType,
        "vehicleVariety": vehicleVariety,
        "frameNo": frameNo,
        "engineCode": engineCode
      };
      $.ajax({
        url: "controller/contract/partyClient/findResourceItems?partyType=vehicle",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          sourceType: "underwriting", //来源类型
          sourceStage: "entry", //来源环节
          resourceItemType: "", // 标的小类
          param: params,
          from: 0,
          limit: 5,
          createFlag: false
        }),
        success: function(map) {
          var resultFlag = map.resultFlag;
          if(resultFlag == 'NotFound'){
            cola.NotifyTipManager.warning({
              message: "",
              description: "标的库查询无匹配标的",
              showDuration: 3000
            });
          }else if(resultFlag == "Found"){
            var data = map.page;
            if (data.data$.length > 1) {
              model.set("standardInformationPopup",[]);
              contractEntity.writeBackVehicleInfoMore(data,rolePath,model);
              cola.widget("carInfor").show();
            } else if (data.data$.length == 1) {
              contractEntity.writeBackVehicleInfo(data,rolePath,model);
            } else {
              cola.NotifyTipManager.warning({
                message: "",
                description: "标的库查询无匹配标的",
                showDuration: 3000
              });
            }
          }

        },
        error: function() {}
      });
    },
    //四川省车辆查询
    carQuery:function () {
      //车辆查询按钮权限初始化校验，四川省
      $.ajax({
        url:"controller/insurance/businessEntity/findCarQueryButtonFlag?configTypeId=CARQUERY",
        type: "POST",
        async:false,
        contentType: "application/json",
        data: {},
        success: function (checkData) {
          // true 显示
          debugger;
          var newCarFlag=model.get("actuals").getFirst().get("plcCar05.newCarFlag");
          if(checkData.rateFluctuationForm=="1" && newCarFlag=="0"){
            var licensePlateNo =model.get('rolePath').get('licensePlateNo');//号牌号码
            var cityCode = licensePlateNo.substring(0,1);
            //四川省车辆查询
            if("川" == cityCode){
              debugger;
              var licensePlateNo =model.get('rolePath').get('licensePlateNo');//号牌号码
              var licenseType = model.get('rolePath').get('licenseType');//号牌种类
              var frameNo =  model.get('rolePath').get('frameNo');//车架号
              //var clsbdh = frameNo.substring(11);//车架号后六位
              if((licensePlateNo == "" && licensePlateNo == null && licensePlateNo == undefined) && (frameNo == "" && frameNo == null && frameNo == undefined) && (licenseType == "" && licenseType == null && licenseType == undefined)){
                contractEntity.appAlert("号牌种类、号牌号码、车架号不能为空！");
                return false;
              }
              var actualId=model.get("actuals").getFirst().get("actualId");
              // 请求后台
              var ajaxTimeoutTest =$.ajax({
                url: "controller/contract/plcMainController/carQuery?hpzl="+licenseType+"&hphm="+licensePlateNo+"&clsbdh="+frameNo,
                type: "POST",
                async: false,
                timeout:30000,//设置超时
                //dataType: "json",
                contentType: "application/json",
                success: function (data){
                  debugger;
                  if (data!=null&&data.success==true) {
                    contractEntity.appAlert("车辆查询成功");
                    var plcCar=model.get("actuals").getFirst().get("plcCar05");
                    var plcCarowners=model.get("actuals").getFirst().get("plcCarowners");
                    if(data.data.zbzl!=null){
                      plcCar.set("vehicleQuality",data.data.zbzl);
                      model.set("vehicleQuality",true);
                    }
                    if(data.data.clsbdh!=null){
                      plcCar.set("frameNo",data.data.clsbdh);
                      model.set("frameNo",true);
                    }
                    if(data.data.fzrq!=null){
                      plcCar.set("certificateDate",data.data.fzrq);
                      model.set("certificateDate",true);
                    }
                    if(data.data.gl!=null){
                      plcCar.set("enginePower",data.data.gl);
                      model.set("enginePower",true);
                    }
                    if(data.data.hpzl!=null){
                      plcCar.set("licenseType",data.data.hpzl);
                      model.set("licenseType",true);
                    }
                    if(data.data.clpp1!=null){
                      plcCar.set("brandName",data.data.clpp1);
                      model.set("brandName",true);
                    }
                    if(data.data.syr!=null){
                      plcCarowners.set("customerName",data.data.syr);
                      model.set("customerName",true);
                    }
                    if(data.data.fdjh!=null){
                      plcCar.set("engineNumber",data.data.fdjh);
                      model.set("engineNumber",true);
                    }
                    if(data.data.ccdjrq!=null){
                        model.set("chaxuncdDate", data.data.ccdjrq)
                      model.set("enrollDate",true);
                    }
                    if(data.data.hdzzl/1000!=null){
                      plcCar.set("vehicleTonnage",data.data.hdzzl/1000);
                      model.set("vehicleTonnage",true);
                    }
                    if(data.data.rlzl!=null){
                      plcCar.set("energyTypesCode",data.data.rlzl);
                      model.set("energyTypesCode",true);
                    }
                    if(data.data.energyTypes!=null){
                      plcCar.set("energyTypes",data.data.energyTypes);
                      //model.set("energyTypesCode",true);
                    }
                    if(data.data.syxz!=null){
                      plcCar.set("policeUseType",data.data.syxz);
                    }
                    if(data.data.carKindCode!=null){
                    	if (data.data.carKindCode.indexOf(",") < 0) {
                    		plcCar.set("carKindCode",data.data.carKindCode);
                            model.set("carKindCode",true);
                            if(data.data.carKindName!=null){
                                plcCar.set("carKindName",data.data.carKindName);
                                model.set("carKindName",true);
                              }
                            if(data.data.cllx!=null){
                                plcCar.set("vehiclestyle",data.data.cllx);
                                model.set("vehiclestyle",true);
                              }
                              if(data.data.vehiclestyleName!=null){
                                plcCar.set("vehiclestyleName",data.data.vehiclestyleName);
                                model.set("vehiclestyle",true);
                              }
                    	}

                    }
                    if(data.data.pl){
                      plcCar.set("exhaustscale",data.data.pl/1000);
                      model.set("exhaustscale",true);
                    }
                    if(data.data.hdzk!=null){
                      plcCar.set("passengersNumber",data.data.hdzk);
                      model.set("passengersNumber",true);
                    }
                    if(data.data.clzysj!=null){
                      plcCar.set("transferdate",data.data.clzysj);
                      model.set("transferdate",true);
                    }
                    plcCar.set("haulage",data.data.zqyzl);
                    model.set("sfzmmc",data.data.sfzmmc);
                    plcCar.set("statusFlag",data.data.zt);
                    model.set("clzyxx",data.data.clzyxx);
                    model.get("actual.plcCar05").set("enrollDate", model.get("chaxuncdDate"));//初登日期
                    model.get("actuals.plcCar05").set("enrollDate", model.get("actual.plcCar05.enrollDate"));//初登日期
                    contractEntity.realityValue();
                  } else if ("timeOut" == data.errcode) {
                    contractEntity.appAlert("交管平台接口超时！");
                  } else {
                    contractEntity.appAlert("查询失败！" + data.message);
                  }
                    model.get("actual.plcCar05").set("enrollDate", model.get("chaxuncdDate"));//初登日期
                    model.get("actual.plcCar05").set("enrollDate", model.get("actual.plcCar05.enrollDate"));//初登日期
                },complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                  if(status=='timeout'){//超时,status还有success,error等值的情况
                    ajaxTimeoutTest.abort();
                    cola.alert("请求超时，请手动录入！");
                  }
                }
              });
            }
          }
        }
      });

    },
    //广东交管车辆查询
    carQueryGD:function () {
      debugger;
      var plcCar=model.get("actuals").getFirst().get("plcCar05");
      var productCode = model.get("actuals").getFirst().get("productCode");
      //车辆查询按钮权限初始化校验，广东省
      var GDCarQueryFlag = false;
      $.ajax({
        url:"controller/integration/autoprovince/gdplatcar/plcGDDataUpload/findGDCarQueryButtonFlag?productcode="+productCode,
        type: "POST",
        async:false,
        contentType: "application/json",
        dataType: "json",
        success: function (checkData) {
          // true 显示

          var newCarFlag=model.get("actuals").getFirst().get("plcCar05.newCarFlag");
          if(checkData.rateFluctuationForm=="1" && newCarFlag=="0"){
            var licensePlateNo =model.get('rolePath').get('licensePlateNo');//号牌号码
            var cityCode = licensePlateNo.substring(0,1);
            if("粤" == cityCode){//广东省车辆查询
              //广东车辆白名单开关
              var plcCar=model.get("actuals").getFirst().get("plcCar05");
              /*if(plcCar.get("vehicleQuality")==null){
                contractEntity.appAlert("整备质量不能为空！");
                return
              }*/
              if(plcCar.get("licenseType")==null){
                contractEntity.appAlert("号牌种类不能为空！");
                return
              }

              if(plcCar.get("vinNo")==null){
                contractEntity.appAlert("VIN码不能为空！");
                return
              }
              /*if(plcCar.get("engineNumber")==null){
                                contractEntity.appAlert("发动机号不能为空！");
                                return
                            }*/
              /*if(plcCar.get("vehiclestyle")==null){
                                contractEntity.appAlert("交管车辆类型不能为空！");
                                return
                            }*/
              /*if(plcCar.get("enrollDate")==null){
                                contractEntity.appAlert("车辆初登日期不能为空！");
                                return
                            }*/
              /*if(plcCar.get("chgownerflag")=="1"){
                if(plcCar.get("transferdate")==null){
                  contractEntity.appAlert("转移登记日期不能为空！");
                  return
                }

              }
*/              GDCarQueryFlag = true;
            }
          }
        }
      });
      if (GDCarQueryFlag) {
        //广东车辆白名单开关
        var CarQueryGDCarWhiteListFlag = false;
        $.ajax({
          url:"controller/insurance/businessEntity/findCarQueryGDCarWhiteListFlag",
          type: "POST",
          async:false,
          contentType: "application/json",
          dataType: "json",
          data:JSON.stringify({
            vin:plcCar.get("vinNo"),//VIN码
            licensePlateNo:plcCar.get("licensePlateNo"),//号牌号码
            licensePlateType:plcCar.get("licenseType"),//号牌种类代码
            engineNo:plcCar.get("engineNumber"),//发动机号
            pmVehicleType:plcCar.get("vehiclestyle"),//交管车辆类型
            firstRegisterDate:plcCar.get("enrollDate"),//初始登记日期
            transferDate:plcCar.get("transferdate"),//转移登记日期
            wholeWeight:plcCar.get("vehicleQuality"),//整备质量
            ratedPassengerCapacity:plcCar.get("passengersNumber"),//核定载客人数
            tonnage:plcCar.get("vehicleTonnage"),//核定载质量
            displacement:plcCar.get("exhaustscale"),//排量
            motorTypeCode:plcCar.get("carKindCode"),//车辆种类
            motorUsageTypeCode:plcCar.get("carUserNatureCode")//使用性质
          }),
          success: function (data) {
            if (data) {

              CarQueryGDCarWhiteListFlag = true;
            }
          }
        });
      }
      if (CarQueryGDCarWhiteListFlag) {
        var motorBike = "0";//是否是摩托车
        var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode");//车辆种类
        if (carKindCode.substring(0,1) == "M") {
          motorBike = "1";
        }
        var licensePlateNo =model.get('rolePath').get('licensePlateNo');//号牌号码
        var licenseType = model.get('rolePath').get('licenseType');//号牌种类
        var frameNo =  model.get('rolePath').get('frameNo');//车架号
        //var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode");//车辆种类
        if((licensePlateNo == "" && licensePlateNo == null && licensePlateNo == undefined) && (frameNo == "" && frameNo == null && frameNo == undefined) && (licenseType == "" && licenseType == null && licenseType == undefined)){
          contractEntity.appAlert("号牌种类、号牌号码、车架号不能为空！");
          return false;
        }
        var lastSixVin = "";
        if (frameNo != null) {
          lastSixVin = frameNo.substring(11);//车架号后六位
        }
        // 请求后台
        var ajaxTimeoutTest =$.ajax({
          url: "controller/contract/plcMainController/gdCarQuery?vin="+frameNo+"&licensePlateNo="+licensePlateNo+"&lastSixVin="+lastSixVin+"&motorBike="+motorBike,
          type: "POST",
          async: false,
          timeout:30000,//设置超时
          //dataType: "json",
          contentType: "application/json",
          success: function (data){

            if (data!=null&&data.errorCode=="0000") {
              contractEntity.appAlert("车辆查询成功");

              //车架号
              if(data.vin!=null){
                plcCar.set("frameNo",data.vin);
              }
              //号牌号码
              if(data.licensePlateNo!=null){
                plcCar.set("licensePlateNo",data.licensePlateNo);
              }
              //号牌种类代码
              if(data.licensePlateType!=null){
                plcCar.set("licenseType",data.licensePlateType);
                plcCar.set("licenseName",licenseTypeFlag(data.licensePlateType));
              }
              //发动机号
              if(data.engineNo!=null){
                plcCar.set("engineNumber",data.engineNo);
              }
              //交管车辆类型
              if(carKindCode!=null && data.pmVehicleType!=null){
                plcCar.set("vehiclestyle",data.pmVehicleType);
                plcCar.set("vehiclestyleName",vehicleStyleFlag(data.pmVehicleType));
              }
              //交管车辆使用性质代码
              plcCar.set("carUserNatureCode",plcCar.get("carUserNatureCode"));
              plcCar.set("carUserNature",vehicleUseNatureFlag(plcCar.get("carUserNatureCode")));
              /*if(data.pmUserNature!=null){
                                plcCar.set("carUserNatureCode",data.pmUserNature);
                                plcCar.set("carUserNature",vehicleUseNatureFlag(data.pmUserNature));
                            }*/
              //车辆初始登记日期
              if(data.firstRegisterDate!=null){
                plcCar.set("enrollDate",data.firstRegisterDate);
              }
              //转移登记日期
              if(data.transferDate!=null && data.transferDate!=""){
                  plcCar.set("transferdate",data.transferDate);
                  model.set("transferdate",true);
              } else {
            	  model.set("transferdate",false);
              }
              //整备质量千克
              if(data.wholeWeight!=null){
                plcCar.set("vehicleQuality",data.wholeWeight);
              }
              //核定载客人数
              if(data.ratedPassengerCapacity!=null){
                plcCar.set("passengersNumber",data.ratedPassengerCapacity);
                model.action("seatCountFn")();
              }
              //核定载质量
              if(data.tonnage!=null){
                plcCar.set("vehicleTonnage",data.tonnage/1000);
              }
              //排量
              if(data.displacement!=null){
                plcCar.set("exhaustscale",data.displacement/1000);
              }
              //交管车身颜色代码
              if(data.color!=null){
                plcCar.set("colorcode",data.color);
                plcCar.set("colorName",colorCodeFlag(data.color));
              }
              //能源种类
              if (data.fuelType!=null) {
                plcCar.set("energyTypesCode",data.fuelType);
                plcCar.set("energyTypes",energyTypesCodeFlag(data.fuelType));
              }
              //车辆型号
              /*if (data.model!=null) {
                plcCar.set("carBrandCode",data.model);
              }*/
              //中文品牌
              if (data.brandCN!=null) {
                plcCar.set("brandName",data.brandCN);
              }
              model.get("actuals.plcCar05").set("enrollDate", model.get("actual.plcCar05.enrollDate"));//初登日期
              contractEntity.realityValue();
            } else if ("timeOut" == data.errcode) {
              contractEntity.appAlert("交管平台接口超时！");
              //阻断流程
              //return false;
            } else {
              contractEntity.appAlert("查询失败！" + data.errorMessage);
              //阻断流程
              //return false;
            }
          },complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
              ajaxTimeoutTest.abort();
              cola.alert("请求超时，请手动录入！");
              //阻断流程
              //return false;
            }
          }
        });
      }
    },

    handoverQueryDetail:function () {

      var licensePlateNo =model.get('rolePath').get('licensePlateNo');//号牌号码
      var carKindCode = model.get('rolePath').get('carKindCode');//车辆种类
      var licenseType = model.get('rolePath').get('licenseType');//号牌种类
      var frameNo =  model.get('rolePath').get('frameNo');//车架号
      var productCode = model.get("actuals").getFirst().get("productCode");//产品代码
      var businessOffice = model.get("actuals").current.get("businessOffice");//归属机构
      var querySequenceNo = model.get("actuals").current.get("plcCar05").get("querySequenceNo");//投保查询码
      var actualId = model.get("actuals").getFirst().get("actualId");
      var proposalNo = model.get("actuals").getFirst().get("proposalNo");
      //var clsbdh = frameNo.substring(11);//车架号后六位
      if((licensePlateNo != "" && licensePlateNo != null && licensePlateNo != undefined && licenseType != "" && licenseType != null && licenseType != undefined) ||
        (frameNo != "" && frameNo != null && frameNo != undefined)){
        // 请求后台
        var ajaxTimeoutTest =$.ajax({
          url: "controller/contract/carNetInfoQuery/handoverQuery",
          type: "POST",
          data: JSON.stringify({
            licenseType: licenseType,
            carKindCode: carKindCode,
            licensePlateNo: licensePlateNo,
            frameNo: frameNo,
            productCode: productCode,
            businessOffice: businessOffice,
            querySequenceNo: querySequenceNo,
            actualId: actualId,
            proposalNo: proposalNo
          }),
          async: false,
          timeout:30000,//设置超时
          //dataType: "json",
          contentType: "application/json",
          success: function (data){

            if (data.body!=null&&data.head.errorMessage=='成功') {
              handoverSearchFlag = "1";
              contractEntity.appAlert("交管信息查询成功");
              var carVehicle = data.body.carVehicle;
              var plcCar=model.get("actuals").getFirst().get("plcCar05");
              var plcCarowners = model.get('actual.plcCarowners');
              //号牌号码
              plcCar.set("licensePlateNo",carVehicle.licensePlateNo);
              //号牌种类代码
              plcCar.set("licenseType",carVehicle.licensePlateType);
              plcCar.set("licenseName",licenseTypeFlag(carVehicle.licensePlateType));
              //车辆识别代号（车架号/VIN码）
              plcCar.set("frameNo",carVehicle.vin);
              plcCar.set("vinNo",carVehicle.vin);
              //发动机号
              plcCar.set("engineNumber",carVehicle.engineNo);
              //车辆类型
              var vehicleStyle = vehicleStyleFlag(carVehicle.motorTypeCode);
              if(vehicleStyle != ""){
                plcCar.set("vehiclestyle",carVehicle.motorTypeCode);
                plcCar.set("vehiclestyleName",vehicleStyle);
              }
              //使用性质代码
              var vehicleUseNature = vehicleUseNatureFlag(carVehicle.motorUsageTypeCode);
              if(vehicleUseNature != ""){
                plcCar.set("carUserNatureCode",carVehicle.vehicleUseNature);
                plcCar.set("carUserNature",vehicleUseNatureFlag(carVehicle.vehicleUseNature));
              }
              //车辆初始登记日期
              plcCar.set("enrollDate",carVehicle.firstRegisterDate);
              //产地种类
              plcCar.set("speciesOriginCode",carVehicle.channelType);
              plcCar.set("speciesOrigin",speciesOriginFlag(carVehicle.channelType));
              //整备质量
              plcCar.set("vehicleQuality",carVehicle.wholeWeight);
              //核定载客人数
              plcCar.set("passengersNumber",carVehicle.limitLoadPerson);
              //排量（毫升）
              plcCar.set("exhaustscale",carVehicle.displacement);
              //中文品牌
              plcCar.set("brandName",carVehicle.vehicleBrand1);
              //车身颜色
              plcCar.set("colorcode",carVehicle.vehicleColour);
              plcCar.set("colorName",colorCodeFlag(carVehicle.vehicleColour));
              //能源种类
              plcCar.set("energyTypesCode",carVehicle.fuelType);
              plcCar.set("energyTypes",energyTypesCodeFlag(carVehicle.fuelType));
              //车主名称
              plcCarowners.set("customerName",carVehicle.vehicleOwnerName);
            } else {
              contractEntity.appAlert("查询失败！" + data.head.errorMessage);
            }
          },complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
              ajaxTimeoutTest.abort();
              cola.alert("请求超时，请手动录入！");
            }
          }
        });
      }else{
        contractEntity.appAlert("号牌种类、号牌号码不能为空，或者车架号不能为空！");
        return false;
      }
      //var actualId=model.get("actuals").getFirst().get("actualId");

    },

    //新车购置价
    changecarInsurantInput:function(self,arg){
      $(window).trigger("changecarInsurantInput");
      //新车购置价-上下线控制
        if(loginStructureCode.split(0, 1) != "31"){
            model.action("checkLocalpurchaseprice")(self,arg);
        }
    },
    setOldValue:function(self,arg) { //新车购置价调整前，判断原值是否为空，为空则赋值
      debugger
  	  if(!model.get("oLdlocalpurchaseprice")){
  		  model.set("oLdlocalpurchaseprice", arg.oldValue); 
  	  }
    },
    checkLocalpurchaseprice:function(self,arg) { //获取新车购置价上浮和下浮的比例
    	debugger
    	 var localpurchaseprice =  model.get("actual.plcCar05.localpurchaseprice");//新车购价
    	 var oLdlocalpurchaseprice = model.get("oLdlocalpurchaseprice");
    	 if(oLdlocalpurchaseprice != localpurchaseprice){
    		 var comCode;
        	 tool.getCurrentLoginInfo(function(datab){
                 comCode = datab.currentLoginStructure.structureId;
             })
             var productCode =  urlParams.productCode;
             if(localpurchaseprice){
                 //交强险上年投保保险期间获取
                 $.ajax({
                       url: "controller/contract/plcMainController/queryLocalpurchasepriceMaxAndMin?comCode="+comCode+"&productCode="+productCode,
                       type: "GET",
                       contentType: "application/json",
                       async:false,
                       success: function (data) {
                           if(data){
                               if(data.max && data.min){
                                   
                            	   var max  = oLdlocalpurchaseprice*(data.max*1+1);
                                   var min  = oLdlocalpurchaseprice*(data.min*1+1);
                            	   if(localpurchaseprice <min){
                            		   contractEntity.appAlert("新车购置价不允许下浮");
                            		   model.set("actual.plcCar05.localpurchaseprice",oLdlocalpurchaseprice);
                            	   }else if (max< localpurchaseprice){
                            		   contractEntity.appAlert("新车购置价不能超过原值的"+(data.max*100)+"%!其上限为："+max+"!");
                            		   model.set("actual.plcCar05.localpurchaseprice",oLdlocalpurchaseprice);
                            		   if(model.get("actual.plcCar05.enrollDate")){
                            			   //初登日期存在时，再更新实际价值
                            			   contractEntity.realityValue();
                            		   }
                            	   }else{
                            		   if(model.get("actual.plcCar05.enrollDate")){
                            			   //初登日期存在时，再更新实际价值
                            			   contractEntity.realityValue();
                            		   }
                            	   }
                               }
                           }
                       }
                 })
             } 
    	 }
    },
    standardInformationPopupMesg:function(){
    },
    // Vin预填
    carInsurantFun:function(){
      var frameNo = model.get('rolePath').get('frameNo');
      if(frameNo =="" || frameNo ==null || frameNo ==undefined){
        contractEntity.appAlert("请输入车架号！");
      }else{

        var data = model.get("actuals").toJSON();
        var actuals = [];

        data.forEach(function(item,index){
          item = { actual: item };
          item = { actual: item };
          item.actual.actual.state$="MODIFIED";
          item.actual.actual.plcCar05.state$="MODIFIED";
          actuals.push(item);
        });
        if(model.get("actuals.isAppTraffic")==0){
          actuals.splice(1,1);
        }

        $.ajax({
          url: "controller/contract/vinQuery/vin",
          type: "POST",
          async: false,
          contentType: "application/json",
          data: JSON.stringify({
            actuals:actuals
          }),
          success: function (data) {
            model.set("vinQuery",[]);
            var ownedStructureId = model.get("actual.businessOffice");
            if(ownedStructureId.substring(0, 2)=="11"){//北京机构
              var errorMessage = data.errorMessage;
              var responseCode = data.responseCode;
              if(responseCode=="0"){
                cola.alert("VIN信息预填失败 [ "+errorMessage + " ]");
                return false;
              }else{
                var pltCarDto = data.pltCarDto;
                model.get("rolePath").set("licenseType",pltCarDto.licenseType);
                model.get("rolePath").set("licenseName",pltCarDto.licenseName);

                data.vehiclePriceList.forEach(function(item,index){
                  model.get("vinQuery").insert({
                    "platModelCode":item.modelCode,
                    "platModelName":"宝马BMW7250(BMW325i)轿车",
                    "rbCode":item.modelIDCode,
                    "brandName":item.brand,
                    "companyName":item.tradeName,
                    "standardName":item.tradeCode,
                    "importFlag":"",
                    "displacement":item.rexhaustCapacity,
                    "power":"141",
                    "seat":item.rlimitLoadPerson,
                    "tonnage":item.rvehicleTonnage,
                    "purchasePrice":item.vehiclePrice,
                    "marketDate":item.rmarketDate,
                    "remark":"自动档 标准型",
                    "familyName":item.rvehicleFamily,
                    "fullWeightMax":item.rvehicleWeight,
                    "fullWeightMin":item.rvehicleWeight,
                    "fcVehicle":item.rvehicleModel
                  })
                })
              }
            }else{//全国
              data.plcVehicleModelDto.forEach(function(item,index){
                model.get("vinQuery").insert({
                  "platModelCode":item.platModelCode,  //平台车型编码
                  "platModelName":item.platModelName,  //平台车型名称
                  "rbCode":item.rbCode, //车型代码
                  "brandName":item.brandName, //品牌名称
                  "companyName":item.companyName, //厂商名称
                  "standardName":item.standardName,  //车型名称
                  "importFlag":importFlag(item), //产地种类
                  "displacement":item.displacement,  //排量(L)
                  "power":item.power, //功率(千瓦)
                  "seat":item.seat,  //座位数
                  "tonnage":item.tonnage,  //载重量
                  "purchasePrice":item.purchasePriceTax, //新车购置价格(含税)
                  "marketDate":item.marketDate, //新车购置价格(含税)
                  "remark":item.remark, //备注
                  "familyName":item.familyName, //车系名称
                  "fullWeightMax":item.fullWeightMax,  //整备质量（最大）千克
                  "fullWeightMin":item.fullWeightMin,  //整备质量（最小）千克
                  "fcVehicle":item.fcVehicle  //车型代码
                })
              })
            }
            cola.widget("carVinCode").show();
          }
        })
      }
    },
    // 详细信息弹出框隐藏
    carInforDetailHideDialog:function(self,arg){
      cola.widget("carInforDetail").hide();
    },
    //输入内容为整数
    numberFn:function(data,obj){
      if(data.get(obj) == 0) {
        data.set(obj,null);
        contractEntity.appAlert("输入内容为数字！");
        return false;
      }

    },

    //找证日期不能大于当前日期
    findCard:function(rolePath){
      var data1=model.get("rolePath.retrieveCertificateDate")
      var data2=new Date();
      if(    data1>data2){
        contractEntity.appAlert("公安机关找回证明日期不能大于当前日期！");
        model.set("rolePath.retrieveCertificateDate","");
      }

    },
    //车辆信息查询弹出框-确定
    standardInformationPopupDetail:function(self, arg){
      var data = arg.model.get("standardInformationPopup").current;
      var rolePath = model.get('rolePath');
      contractEntity.writeBackVehicleInfo(data,rolePath,model);
      cola.widget("carInfor").hide();
    },
    //车辆信息查询弹出框-取消
    standardInformationPopupHide:function(){
      cola.widget("carInfor").hide();
    },
    //车辆信息查询弹出框-重置
    /*standardInformationPopupRest:function(){
            model.set("standardInformationPopup",{
                licensePlateNo: "",
                carKindCode: "",
                frameNo: "",
                engineType: "",
                licenseType:"",
                licenseKind:""
            });

        },*/
    //产地种类与条款联动
    changeSpecies:function(){
      window.modeCodeFn();
    },
    registmodelcodeToUpper: function(data){
      var registModel = data.get("registModel");
      if(registModel !=null){
        registModel = registModel.toUpperCase();
      }
      model.get("rolePath").set("registModel",registModel);
    },
    // 车联网查询
    carNetQuery:function(){

      var businessOffice = model.get("actuals").current.get("businessOffice");//归属机构
      var demandNo = model.get("actuals").current.get("plcCar05").get("querySequenceNo");//投保查询码
      var actualId = model.get("actuals").getFirst().get("actualId");
      var licenseNo = model.get('rolePath').get('licensePlateNo');//号牌号码
      var newCarFlag = model.get('rolePath').get('newCarFlag');//是否上牌
      var plateCorlor = model.get('rolePath').get('licenseColorCode');//号牌底色
      var frameNo = model.get('rolePath').get('frameNo');//车架号
      var vin = model.get('rolePath').get('vinNo');//vin码
      var vehicleTonnage = model.get('rolePath').get('vehicleTonnage');//核定载质量
      var vehicleQuality = model.get('rolePath').get('vehicleQuality');//整备质量(千克)
      var carKindCode = model.get('rolePath').get('carKindCode');//车辆种类
      if (!businessOffice) {
        contractEntity.appAlert("请确认'归属机构'是否已经录入！");
        return false;
      }
      if (!licenseNo) {
        contractEntity.appAlert("请确认'号牌号牌'是否已经录入！");
        return false;
      }
      if (!plateCorlor) {
        contractEntity.appAlert("请确认'号牌底色'是否已经录入！");
        return false;
      }
      if (!frameNo) {
        contractEntity.appAlert("请确认'车架号'是否已经录入！");
        return false;
      }
      // 处理数据
      if (vehicleTonnage) {
        vehicleTonnage = Number(vehicleTonnage);
      } else {
        vehicleTonnage = 0;
      }
      if (vehicleQuality) {
        vehicleQuality = Number(vehicleQuality);
      } else {
        vehicleQuality = 0;
      }
      // 未上牌
      if (newCarFlag == '1') {
        contractEntity.appAlert("未上牌车辆不允许查询！");
        return false;
      }
      // 软提示
      if (!carKindCode) {
        cola.confirm("该功能只适用于重载货车，请确认是否继续?",{
          onApprove:function(){
            // 请求后台
            $.ajax({
              url: "controller/contract/carNetInfoQuery/queryAndinsertCarModelInfo",
              type: "POST",
              async: false,
              contentType: "application/json",
              data: JSON.stringify({
                businessOffice: businessOffice,
                actualId: actualId,
                licenseNo: licenseNo,
                plateCorlor: plateCorlor,
                frameNo: frameNo,
                vin: vin,
                demandNo: demandNo
              }),
              success: function (data){
                if (data) {
                  contractEntity.appAlert("车联网查询成功");
                } else {
                  contractEntity.appAlert("车联网查询失败！" + data);
                }
              }
            });
          },
          onDeny:function(){
            $(".waittingRenderBox").css("display","none");
            return false;
          }
        });
      } else {
        // 仅半挂牵引车、货车、特种车一、特种车四 可以查询
        if ('G2' != carKindCode && 'H0' != carKindCode && 'TP' != carKindCode
          && 'TQ' != carKindCode && 'TR' != carKindCode && 'TT' != carKindCode
          && 'G1' != carKindCode && 'T19' != carKindCode && 'H1' != carKindCode) {
          contractEntity.appAlert("非半挂牵引车、货车、特种车一、特种车四不允许查询！");
          return false;
        }
        // 货车、特种车一、特种车四
        if ('H0' == carKindCode || 'TP' == carKindCode || 'TQ' == carKindCode
          || 'TR' == carKindCode || 'TT' == carKindCode || 'H1' == carKindCode
          || 'G1' == carKindCode || 'T19' == carKindCode) {
          var totalMass = Number(vehicleTonnage + vehicleQuality/1000).toFixed(2);
          if ( totalMass < 12 ) {
            contractEntity.appAlert("总质量低于查询标准(12t)，请核实数据！");
            return false;
          }
        }
        // 请求后台
        $.ajax({
          url: "controller/contract/carNetInfoQuery/queryAndinsertCarModelInfo",
          type: "POST",
          async: false,
          contentType: "application/json",
          data: JSON.stringify({
            businessOffice: businessOffice,
            actualId: actualId,
            licenseNo: licenseNo,
            plateCorlor: plateCorlor,
            frameNo: frameNo,
            vin: vin,
            demandNo: demandNo
          }),
          success: function (data){
            if (data) {
              contractEntity.appAlert("车联网查询成功");
            } else {
              contractEntity.appAlert("车联网查询失败！" + data);
            }
          }
        });
      }
    },
    // 车联网详细信息弹框
    carNetQueryDetail:function(){

      var actualId = model.get("actuals").getFirst().get("actualId");
//      var licenseNo = model.get('rolePath').get('licensePlateNo');//号牌号码
      var frameNo = model.get("actuals").getFirst().get("plcCar05.frameNo");
      if (!frameNo) {
        contractEntity.appAlert("'车架号'不能为空！");
        return false;
      }
      $.ajax({
        url: "controller/contract/carNetInfoQuery/getCiCarModelGrade?actualId="+actualId+"&frameNo="+frameNo,
        type: "POST",
        async: false,
        contentType: "application/json",
        data: JSON.stringify({
          actualId: actualId,
          frameNo: frameNo
        }),
        success: function (data){
          model.set("carNetInforDetail",data);
          cola.widget("carNetInforDetail").show();
        }
      })
    },

    // 请求后台，返回上海平台数据
    getVehicleQueryData: function () {
      var data = model.get("actuals").toJSON();
      var actuals = [];
      var returnData = null;
      data.forEach(function (item, index) {
        item = {actual: item};
        item = {actual: item};
        item.actual.actual.state$ = "MODIFIED";
        item.actual.actual.plcCar05.state$ = "MODIFIED";
        item.actual.actual.plcSales[0].state$ = "MODIFIED";
        actuals.push(item);
      });
      if (model.get("actuals.isAppTraffic") == 0) {
        actuals.splice(1, 1);
      }

      $.ajax({
        url: "controller/contract/autoplatform/shVehicleQuery/vehicleQuery",
        type: "POST",
        async: false,
        contentType: "application/json",
        data: JSON.stringify({
          actuals: actuals
        }),
        success: function (data) {
          model.set("vehicleQueryList", []);
          returnData = JSON.parse(data);
        }
      })
      return returnData;
    },
    // 平台车型查询按钮事件
    vehicleQuery:function () {
      var businessOffice = model.get("actuals").getFirst().get("businessOffice");// 归属部门
      var channelType = model.get("actuals").getFirst().get('channelType'); // 销售渠道
      var mainSalesmanCode = model.get("actuals").getFirst().get('mainSalesmanCode');// 主业务人员代码
      var businessNatureCode = model.get("actuals").getFirst().get('businessNatureCode');// 业务来源代码
      if (!businessOffice || !channelType || !mainSalesmanCode || !businessNatureCode) {
        contractEntity.appAlert("请先完善业务归属信息！");
        return false;
      }

      // 上海判断新车本地车外地车根据号牌号码判断，如果空，为新车，如果是沪，为本地车，否则就是外地车
      var licensePlateNo = model.get('rolePath').get('licensePlateNo');// 号牌号码
      var newCarFlag = model.get('rolePath').get('newCarFlag');// 是否上牌 0是/1否
      var foreignCarFlag = model.get('rolePath').get('foreignCarFlag');// 是否外地车 0否/1是

      if(licensePlateNo && licensePlateNo.indexOf("沪") > -1){
        if(foreignCarFlag == "1"){
          contractEntity.appAlert("您已录入沪牌，请选择将【是否本地车】置为\'是\'进行出单！");
          return false;
        }
      }

      // 沪牌选查精友库，其他必查精友库
      if (newCarFlag == '1' || foreignCarFlag == '1') {
        // 判断是否完成厂牌型号查询
        if(cola.model().get("isFinishCarBrandCodeQuery") == false){
          contractEntity.appAlert("请先进行'厂牌型号'查询！");
          return false;
        }
      }

      // 共有校验：车辆种类代码、车辆使用性质代码、新车购置价必填且大于0、保险起期
      // 沪牌数据校验必填规则：
      //   号牌号码及号牌种类必传；
      // 外地车数据校验必填规则：
      //   号牌号码及号牌种类必传；
      //   车架号、发动机号、车辆品牌、车辆型号、初次登记日期、行驶证车辆描述必填；
      // 新车数据校验必填规则：
      //   车架号、发动机号、车辆品牌、车辆型号、购买日期
      debugger;
      var carKindCode = model.get('rolePath').get('carKindCode');//车辆种类代码
      if (!carKindCode) {
        contractEntity.appAlert("'车辆种类'不能为空！");
        return false;
      }
      var carUserNatureCode = model.get('rolePath').get('carUserNatureCode');//车辆使用性质
      if (!carUserNatureCode) {
        contractEntity.appAlert("'车辆使用性质'不能为空！");
        return false;
      }
      var localpurchaseprice = model.get('rolePath').get('localpurchaseprice');//新车购置价
      if (!localpurchaseprice || localpurchaseprice <= 0) {
        contractEntity.appAlert("'新车购置价'不能为空且必须大于零！");
        return false;
      }
      var startTime = model.get("actuals").getFirst().get("startTime");// 起保日期
      if (!startTime) {
        contractEntity.appAlert("'起保日期'不能为空！");
        return false;
      }

      //如果不是新车
      if(newCarFlag == '0'){
        var licensePlateNo = model.get('rolePath').get('licensePlateNo');// 号牌号码
        if (!licensePlateNo) {
          contractEntity.appAlert("'号牌号码'不能为空！");
          return false;
        }
        var licenseType = model.get('rolePath').get('licenseType');// 号牌种类
        if (!licenseType) {
          contractEntity.appAlert("'号牌种类'不能为空！");
          return false;
        }
        if(foreignCarFlag == '1'){//是外地车
          //车架号、发动机号、车辆品牌、车辆型号、初次登记日期、行驶证车辆描述必填；
          var frameNo = model.get('rolePath').get('frameNo');// 车架号
          if (!frameNo) {
            contractEntity.appAlert("'车架号'不能为空！");
            return false;
          }
          var engineNumber = model.get('rolePath').get('engineNumber');// 发动机号
          if (!engineNumber) {
            contractEntity.appAlert("'发动机号'不能为空！");
            return false;
          }
          var brandName = model.get('rolePath').get('brandName');// 车辆品牌
          if (!brandName) {
            contractEntity.appAlert("'车辆品牌'不能为空！");
            return false;
          }
          // var carmodelid = model.get('rolePath').get('carmodelid');// 车辆型号
          // if (!carmodelid) {
          //   contractEntity.appAlert("精友平台返回的'车辆型号'为空，请联系IT运维人员！");
          //   return false;
          // }
          var enrollDate = model.get('rolePath').get('enrollDate');// 车辆初登日期
          if (!enrollDate) {
            contractEntity.appAlert("'车辆初登日期'不能为空！");
            return false;
          }
          var vehiclestyledesc = model.get('rolePath').get('vehiclestyledesc');// 行驶证车辆描述
          if (!vehiclestyledesc) {
            contractEntity.appAlert("'行驶证车辆描述'不能为空！");
            return false;
          }
        }
      }else{
        //车架号、发动机号、车辆品牌、车辆型号、购买日期
        var frameNo = model.get('rolePath').get('frameNo');// 车架号
        if (!frameNo) {
          contractEntity.appAlert("'车架号'不能为空！");
          return false;
        }
        var engineNumber = model.get('rolePath').get('engineNumber');// 发动机号
        if (!engineNumber) {
          contractEntity.appAlert("'发动机号'不能为空！");
          return false;
        }
        var brandName = model.get('rolePath').get('brandName');// 车辆品牌
        if (!brandName) {
          contractEntity.appAlert("'车辆品牌'不能为空！");
          return false;
        }
        // var carmodelid = model.get('rolePath').get('carmodelid');// 车辆型号
        // if (!carmodelid) {
        //   contractEntity.appAlert("精友平台返回的'车辆型号'为空，请联系IT运维人员！");
        //   return false;
        // }
        var buyDate = model.get('rolePath').get('buyDate');//购买日期
        if (!buyDate) {
          contractEntity.appAlert("'购买日期'不能为空！");
          return false;
        }
      }
      // 弹出框样式设置
      $(".table-body").css("max-height","15em");
      $(".bordered").css("height:16em");
      //viewInquiryFlag，标识当前页面是否是详细信息页面，还是投保录入页面啊
      if(!urlParams.viewInquiryFlag && !urlParams.businessNoType){
        var returnData = model.action("getVehicleQueryData")();
        if (returnData != null) {
          model.set("vehicleQueryList",[]);
          var shPlatQueryMsg = "平台车型查询";
          var shPureRiskPremiumQueryBasePart = returnData.body.shPureRiskPremiumQueryBasePart;
          if(returnData.head.errorMessage.length > 2){
            shPlatQueryMsg += ":"+returnData.head.errorMessage;
          }
          model.set("shPlatQueryMsg",shPlatQueryMsg);
          returnData.body.shCarModelList.forEach(function(item,index){
            model.get("vehicleQueryList").insert({
              "searchSequenceNo" : shPureRiskPremiumQueryBasePart.searchSequenceNo,//车型查询码
              "licensePlateNo" : shPureRiskPremiumQueryBasePart.licensePlateNo,//号牌号码
              "licenseType" : shPureRiskPremiumQueryBasePart.licenseType,//号牌种类
              "vinNo" : shPureRiskPremiumQueryBasePart.rackNo,//车辆识别代号
              "engineNo" : shPureRiskPremiumQueryBasePart.engineNo,//发动机号
              "carOwner" : shPureRiskPremiumQueryBasePart.ownerName,//行驶证车主
              "enrollDate" : shPureRiskPremiumQueryBasePart.enrollDate,//车辆初始登记日
              "vehicleCode" : item.vehicleCode,
              "vehicleName" : item.vehicleName,
              "vehicleBrand" : item.vehicleBrand,
              "vehicleFamily" : item.vehicleFamily,
              "importFlag" : item.importFlag,
              "limitLoadPerson" : item.limitLoadPerson,
              "vehicleWeight" : item.vehicleWeight,
              "vehicleTonnage" : item.vehicleTonnage,
              "transmissionType" : item.transmissionType,
              "absFlag" : item.absFlag,
              "alarmFlag" : item.alarmFlag,
              "airbagNum" : item.airbagNum,
              "vehicleDescription" : item.vehicleDescription,
              "vehiclePrice" : item.vehiclePrice,
              "refcode1" : item.refcode1,
              "refcode2" : item.refcode2,
              "exhaustCapacity" : item.exhaustCapacity,
              "marketDate" : item.marketDate,
              "isPriced" : item.isPriced,
              "riskFlag" : item.riskFlag,
              "modelCode" : item.modelCode,
              "modelIDCode" : item.modelIDCode,
              "tradeName" : item.tradeName,
              "tradeCode" : item.tradeCode,
              "brand" : item.brand,
              "brandCode" : item.brandCode,
              "series" : item.series,
              "seriesCode" : item.seriesCode,
              "carName" : item.carName,
              "noticeType" : item.noticeType,
              "configType" : item.configType,
              "categoryName" : item.categoryName,
              "categoryCode" : item.categoryCode,
              "deptName" : item.deptName,
              "deptCode" : item.deptCode
            })
          })
          cola.widget("vehicleQuery").show();
        }
      }
    },
    // 平台车型查询弹出框x按钮及取消按钮vehicleQueryDetail
    vehicleQueryHideDialog:function(self,arg){
      cola.widget("vehicleQuery").hide();
    },
    jsVehicleQuery:function(){
      var vinNo = model.get("actual.plcCar05.frameNo");
      var licensePlateNo = model.get("actual.plcCar05.licensePlateNo");
      if(!vinNo){
        cola.alert("号码号牌和车架号不能为空")
        return false
      }else if(!licensePlateNo){
        cola.alert("号码号牌和车架号不能为空")
        return false
      }
      else {
        cola.widget("jsVehicleQuery").show();
        var vinNo = model.get("actual.plcCar05.frameNo");
        var licensePlateNo = urlParams.licensePlateNo;
        model.set("mycode","");
        model.set("codeInput","")
      }
    },
    jsVehicleQueryHideDialog:function(self,arg){
      cola.widget("jsVehicleQuery").hide();
    },
    jsMsgQuery:function(self,arg){
      cola.widget("jsMsgQuery").show();
    },
    jsMsgQueryHideDialog:function(self,arg){
      cola.widget("jsMsgQuery").hide();
    },



    // 平台车型查询弹出框确定按钮
    vehicleQueryDetail:function(self,arg){
      //设置车型查询码searchSequenceNo
      //model.get("actuals").current.get("plcCar05").set("searchSequenceNo","1");
      var vehicleQueryList = arg.model.get("vehicleQueryList").current;
      var vehicleCode = vehicleQueryList.get("vehicleCode");
      $.ajax({
        url: "controller/contract/autoplatform/shVehicleQuery/getJYCarDataByVehicleCode?productCode="+model.get("actuals").getFirst().get("productCode")+"&vehicleCode="+vehicleCode,
        type: "POST",
        async: false,
        contentType: "application/json",
        success: function (data) {

          var plcCar=model.get("actuals").getFirst().get("plcCar05");
          if(data == true){//精友库中存在数据，回显平台返回的车辆信息，并且将回显的信息设置为不可编辑，同时禁用厂牌查询按钮？
            cola.model().set("isFinishVehicleQuery",true);
            cola.widget("vehicleQuery").hide();
              //车主名称
            if (vehicleQueryList.get("carOwner") != null && vehicleQueryList.get("carOwner") != "") {
                window.ownerNname(vehicleQueryList);
            }
            //上海行业车型代码
            if(vehicleQueryList.get("vehicleCode") != null && vehicleQueryList.get("vehicleCode") != ""){
              //回写到 平台车型代码 字段
              plcCar.set("vehiclecode",vehicleQueryList.get("vehicleCode"));
              // model.set("vehiclecode",true);
            }
            //全国行业车型代码/平台返回的车型代码
            if(vehicleQueryList.get("modelCode") != null && vehicleQueryList.get("modelCode") != ""){
              //回写到 平台返回的车型代码 字段
              plcCar.set("modelCode",vehicleQueryList.get("modelCode"));
              // model.set("modelCode",true);
            }
            //车价（不含税）
            if(vehicleQueryList.get("vehiclePrice") != null && vehicleQueryList.get("vehiclePrice") != ""){
              plcCar.set("localpurchaseprice",vehicleQueryList.get("vehiclePrice"));
              // plcCar.set("purchaseprice",vehicleQueryList.get("vehiclePrice"));
              // model.set("purchaseprice",true);
            }
            //车型查询码
            plcCar.set("searchSequenceNo",vehicleQueryList.get("searchSequenceNo"));
            // 号牌号码
            if(vehicleQueryList.get("licensePlateNo") != null && vehicleQueryList.get("licensePlateNo") != ""){
              plcCar.set("licensePlateNo",vehicleQueryList.get("licensePlateNo"));
              // model.set("licensePlateNo",true);
            }
            // 号牌种类
            if(vehicleQueryList.get("licenseType") != null && vehicleQueryList.get("licenseType") != ""){
              plcCar.set("licenseType",vehicleQueryList.get("licenseType"));
              // model.set("licenseType",true);
            }
            // 发动机号
            if(vehicleQueryList.get("engineNo") != null && vehicleQueryList.get("engineNo") != ""){
              plcCar.set("engineNumber",vehicleQueryList.get("engineNo"));
              // plcCar.set("engineNo",vehicleQueryList.get("engineNo"));
              // model.set("engineNumber",true);
            }
            //额定载客人数
            if(vehicleQueryList.get("limitLoadPerson") != null && vehicleQueryList.get("limitLoadPerson") != ""){
              plcCar.set("passengersNumber",vehicleQueryList.get("limitLoadPerson"));
              plcCar.set("seatcount",vehicleQueryList.get("limitLoadPerson"));
              model.action("seatCountFn")();
              // model.set("passengersNumber",true);
            }
            // 载重量
            if(vehicleQueryList.get("vehicleTonnage") != null && vehicleQueryList.get("vehicleTonnage") != ""){
              plcCar.set("vehicleTonnage",vehicleQueryList.get("vehicleTonnage"));
              plcCar.set("toncount",vehicleQueryList.get("vehicleTonnage"));
              // model.set("vehicleTonnage",true);
            }
            // 排量
            if(vehicleQueryList.get("exhaustCapacity") != null && vehicleQueryList.get("exhaustCapacity") != ""){
              plcCar.set("exhaustscale",vehicleQueryList.get("exhaustCapacity")/1000);
              // model.set("exhaustscale",true);
            }
            // 车型名称
            if(vehicleQueryList.get("vehicleName") != null && vehicleQueryList.get("vehicleName") != ""){
              // plcCar.set("vehicleName",vehicleQueryList.get("vehicleName"));
              // model.set("vehicleName",true);
              //车辆型号
              // plcCar.set("carmodelid",vehicleQueryList.get("vehicleName"));
              // model.set("carmodelid",true);
              // 厂牌型号
              plcCar.set("carBrandCode",vehicleQueryList.get("vehicleName"));
            }
            // 品牌名称
            if(vehicleQueryList.get("vehicleBrand") != null && vehicleQueryList.get("vehicleBrand") != ""){
              plcCar.set("brandName",vehicleQueryList.get("vehicleBrand"));
              // model.set("brandName",true);
            }
            // 行驶证车主
            if(vehicleQueryList.get("carOwner") != null && vehicleQueryList.get("carOwner") != ""){
              plcCar.set("carowner",vehicleQueryList.get("carOwner"));
              // model.set("owner",true);
            }
            // 初登日期
            if(vehicleQueryList.get("enrollDate") != null && vehicleQueryList.get("enrollDate") != ""){
              plcCar.set("enrollDate",new Date(vehicleQueryList.get("enrollDate").replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3") + " 00:00:00"));
              plcCar.set("enrollDate",new Date(vehicleQueryList.get("enrollDate").replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3") + " 00:00:00"));
              // model.set("enrollDate",true);
            }
            // VIN码
            if(vehicleQueryList.get("vinNo") != null && vehicleQueryList.get("vinNo") != ""){
              plcCar.set("vinNo",vehicleQueryList.get("vinNo"));
              // model.set("vinNo",true);
              // 车架号
              plcCar.set("frameNo",vehicleQueryList.get("vinNo"));
              // model.set("frameNo",true);
            }
              var licensePlateNo = model.get('rolePath').get('licensePlateNo');// 号牌号码
              if(licensePlateNo && licensePlateNo.indexOf("沪") > -1){
                  plcCar.set("vehiclestyledesc","");
              }
            //车型描述
            /* if(vehicleQueryList.get("vehicleDescription") != null){
               plcCar.set("vehiclestyledesc",vehicleQueryList.get("vehicleDescription"));
               // model.set("vehiclestyledesc",true);
             }*/
            //如果本地库中的新车购置价不为空，则回写到该字段，取值不确定
            // plcCar.set("localpurchaseprice",vehicleQueryList.get("vehiclePrice"));
            // model.set("localpurchaseprice",true);
            //设置实际使用年数
            contractEntity.getUserYears(model);
            // 计算车辆实际价值
            contractEntity.realityValue();


            //老核心回写了下三个字段，新核心是否会写，待确认
            // platModelCode
            // platModelName
            // platStandardName
            // 以下信息是否回写，老核心未回写
            // 整车质量
            // if(vehicleQueryList.get("vehicleWeight") != null){
            //     plcCar.set("vehicleQuality",vehicleQueryList.get("vehicleWeight"));
            //     model.set("vehicleQuality",true);
            // }
            // // 品牌名称
            // if(vehicleQueryList.get("brandNameShangHai") != null){
            //     plcCar.set("brandName",vehicleQueryList.get("brandNameShangHai"));
            //     model.set("brandName",true);
            // }
            // //车系名称
            // modeal.set("",vehicleQueryList.get("familyNameShangHai"));
            // //车型种类
            // modeal.set("",vehicleQueryList.get("rImportFlag"));
            // //变速器形式
            // modeal.set("",vehicleQueryList.get("transmissionType"));
            // //是否有ABS
            // modeal.set("",vehicleQueryList.get("isAbs"));
            // //是否有防盗装备
            // modeal.set("",vehicleQueryList.get("isAlarm"));
            // //安全气囊数
            // modeal.set("",vehicleQueryList.get("airBagNums"));
            // //参考代码1
            // modeal.set("",vehicleQueryList.get("refcode1"));
            // //参考代码2
            // modeal.set("",vehicleQueryList.get("refcode2"));
            // //年款
            // modeal.set("",vehicleQueryList.get("rMarketDate"));
            // //是否已定价
            // modeal.set("",vehicleQueryList.get("isPriced"));
            // //风险标志
            // modeal.set("",vehicleQueryList.get("riskFlag"));
            // //行业车型代码
            // modeal.set("",vehicleQueryList.get("vehicleId"));
            // //车型识别编码
            // modeal.set("",vehicleQueryList.get("platModelIDCode"));
            // //厂商名称
            // modeal.set("",vehicleQueryList.get("tradeName"));
            // //厂商编码
            // modeal.set("",vehicleQueryList.get("tradeCode"));
            // //品牌编码
            // modeal.set("",vehicleQueryList.get("brandId"));
            // //车系名称
            // modeal.set("",vehicleQueryList.get("familyNameQuanGuo"));
            // //车系编码
            // modeal.set("",vehicleQueryList.get("familyId"));
            // //车款名称
            // modeal.set("",vehicleQueryList.get("platModelName"));
            // //公告型号
            // modeal.set("",vehicleQueryList.get("announcementModel"));
            // //配置款型编码
            // modeal.set("",vehicleQueryList.get("configType"));
            // //类别名称
            // modeal.set("",vehicleQueryList.get("categoryName"));
            // //类别编码
            // modeal.set("",vehicleQueryList.get("categoryCode"));
            // //系别名称
            // modeal.set("",vehicleQueryList.get("deptName"));
            // //系别名称编码
            // modeal.set("",vehicleQueryList.get("deptCode"));
          }else{
            //需要清空 车型代码
            plcCar.set("vehiclecode","");
            model.set("vehiclecode",false);
            contractEntity.appAlert("【"+vehicleCode+"】平台返回车型数据在本地没有对应记录，请与平台核实！");
          }
        }
      })
    },
    //车险功率校验 只交强校验
    chgEnginePower:function () {

      contractEntity.checkEnginePower(model);
    },
    //校验二手车是否修改
    changeSecondHanderCar:function(){
        var shIsSecondHander = cola.model().get("shIsSecondHander");
        //0-否  1-是
        if(shIsSecondHander){
            if(shIsSecondHander == "1"){
                cola.model().set("shIsSecondHander","0");
            }else{
                cola.model().set("shIsSecondHander","1");
            }
        }
        debugger
        var entity = model.get("actual.plcCar05");
        var buyDate = model.get('rolePath').get('buyDate');//购买日期
        var errorMsg = contractEntity.checkBuyDate(buyDate,entity);
        if(errorMsg){
            contractEntity.changeStylesForCheck("c-form","dataType","PlcCar05","buyDate",errorMsg);
        }else{
            contractEntity.changeStylesForCheck("c-form","dataType","PlcCar05","buyDate","");
        }
	},
	//校验转移登记日期不能早于签单日期
	checkTransferdate: function(thisDate){
		if (thisDate && urlParams.endorseType) {
			var checkDate = model.get("actuals").current.get("applicantDate");
			var tempDate = new Date(new Date(contractEntity.getServiceTime().setFullYear(checkDate.getFullYear(),checkDate.getMonth(),checkDate.getDate())).toLocaleDateString()+" "+ "00:00:00");
			if (thisDate < tempDate) {
				model.set("actuals.plcCar05.transferdate", "");
				App.alert("转移登记日期不能早于保单签单日期");
			}
		}
	}
  });
  cola.ready(function(){

    // 判断是否进入过户批改页面

    model.set("che",model.get("rolePath").get("frameNo"))
    model.set("fad",model.get("rolePath").get("engineNumber"))

    model.set("chez",model.get("rolePath").get("carKindCode"))
    model.set("chud",model.get("rolePath").get("enrollDate"))
    if(urlParams.endorseType=="97"){
      debugger;
      model.set("endorseType",true);
      model.set("newCarFlagb",false);
      model.get("rolePath").set("secondhandcarflag",1);
      model.get("rolePath").set("chgownerflag",1);
      model.get("rolePath").set("specialVehicleTypesCode","1");
      model.get("rolePath").set("specialVehicleTypes","车辆所有权转移重新投保");
      
      debugger;
      var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode")
      if(carKindCode){
    	  if(",J0,J1,J2,M0,M1,M2,M3,".indexOf(","+carKindCode+",") > -1){
    		  model.set("newCarFlagMT",false);
    		  
    	  }else{
    		  model.set("newCarFlagMT",true);
    		  model.get("rolePath").set("rateFloatTypeCI","FT4");
    	      model.get("rolePath").set("rateFloatTypeCodeCI","机动车所有权转移-不浮动");
    	  }   	 
      }

      // model.set("correctsTheTransferShow",true);
      model.get("actual.plcCar05").set("newCarFlag","0");  //批改过户 车牌号可编辑
        if (loginStructureCode.substring(0,2) == '11') {
            model.set("newCarFlagb",true);
        }
      if (!urlParams.viewInquiryFlag) {
    	  model.action("checkTransferdate")(model.get("rolePath").get("transferdate"));
      }
      //model.get("actual.plcCar05").set("newCarFlag","1");
      //if(urlParams.flag=="next"){
      //    model.get("rolePath").set("certificateDate","")
      //}
    }else{
      model.set("endorseType",false);
      model.set("newCarFlagb",false)
    }
  var param = cola.util.queryParams();
    //北京地区旧车控制车辆信息是否只读部分
   if(model.get("$currentUserInfo.structureId").substring(0,2)=='11'){//是否为北京
      if (param.resultKey != undefined) {
          model.set('newCarFlagbBJ', '11')
      }
      if (model.get("actual.newPolicyFlag") != 1 && model.get("actual.transferPolicyFlag") !=1 && model.get("actual.transrenewFlag") !=1 && param.dataCopy != 'Y') {
          model.set("newCarFlagb", false);

      }
   }
      if (model.get("actual.plcCar05.newCarFlag") == '0' && loginCode.substring(0, 2) == '11' && param.dataCopy == 'Y') {
          model.set("newCarFlagb",true)
      }
    model.set("carUserNatureCodeBB",model.get("rolePath.carUserNatureCode"));
    model.set("che",model.get("rolePath").get("frameNo"));
    model.set("fad",model.get("rolePath").get("engineNumber"));
    model.set("chez",model.get("rolePath").get("carKindCode"));
    model.set("chud",model.get("rolePath").get("enrollDate"));
    model.get("actuals").each(function(item){
      if(item.get("productCode") !="0507" && !item.get("plcCar05.carpriceTypeName")){
        item.get("plcCar05").set("carpriceType",1);
        item.get("plcCar05").set("carpriceTypeName","实际价值");
      }
    })
    //contractEntity.isTrafficShow(model)
    //调取公共方法--是否禁用
    contractEntity.HideFn(urlParams.viewInquiryFlag);
    var date = contractEntity.getServiceTime();
    date = new Date(date.toLocaleDateString());
    if(!urlParams.endorseType){
      //if(!model.get("rolePath.enrollDate")){
      //    model.get("rolePath").set("enrollDate",date);
      //}
      //if(!model.get("rolePath.certificateDate")){
      //    model.get("rolePath").set("certificateDate",date);
      //}
      if(!model.get("rolePath.useyears")){
        model.get("rolePath").set("useyears",0);
      }
    }
    model.set("che",model.get("rolePath").get("frameNo"))
    model.set("fad",model.get("rolePath").get("engineNumber"))

    model.set("chez",model.get("rolePath").get("carKindCode"))
    model.set("chud",model.get("rolePath").get("enrollDate"))
    window.setProductReadonly && window.setProductReadonly(); // 设置禁用页面
    //获取需要实时高亮的dom集合
    if(urlParams.endorseType){//todo 需要判断只有批改时执行
      contractEntity.getActualCompareMap(model);
      if (urlParams.endorseType!="97") {
    	  // 非过户批改时是否为二手车默认只读无法选择，只有通过修改发证日期才可
    	  model.set("chgownerflag",true);
    	  model.set("secondHandCar",true);
      }
    }
    if(urlParams.businessNoType || (urlParams.endorseType && urlParams.viewInquiryFlag)){
      if(window.changeListBus){
        var $itemsCompareDom = $(".itemsCompareDom");
        contractEntity.compareAddMessage(model, window.changeListBus);
      }
    }
    if(model.get("actuals").getFirst().get("agreementNo") && model.get("actuals").getFirst().get("agreementNo") != "") {
      var actual = model.get("actuals").getFirst(),
        productCode = actual.get("productCode");
      if (model.get("agreementRule.carRule.carUserNatureCode") && model.get("agreementRule.carRule.carUserNatureCode") != "" ) {
        model.set("carUserNatureCodeFlag",true);
        //cola.tag("carUserNatureCodeFlag").set("readOnly", true);
      }else{
        if($.isArray(['0512','0513','0515'],productCode)){
          model.set("carUserNatureCodeFlag",false);
        }
      }
      if (model.get("agreementRule.carRule.carKindCode")  && model.get("agreementRule.carRule.carKindCode") != "") {
        model.set("carKindCodeFlag",true);
        cola.tag("carKindCodeFlag").set("readOnly", true);
      }else{
        if($.isArray(['0512','0513','0515'],productCode)){
          model.set("carKindCodeFlag",false);
        }
      }
    }

    //深圳隐藏车辆标的信息中的【跨省首年投保未出现年数(年)】 和 【是否车贷投保多年】
    var provincePrefix4 = loginStructureCode.substring(0,4);
    if (provincePrefix4 == '4403') {
        model.set("shenZhenHidden",false);
    }
    if(urlParams.dataCopy && urlParams.dataCopy == "Y"){
        // 设置实际使用年数
        contractEntity.getUserYears(model);
        // 计算车辆实际价值
        contractEntity.realityValue();
    }
  });
  //厂牌型号及vin预填双击回填
  function detailInformation(data){

    var rolePath = model.get("rolePath");
    var speciesOrigin = {"importFlag":importFlag(data.plcVehicleModelVO)};
    //车船税减免起期
    rolePath.set("hfStartTime",data.plcVehicleModelVO.hfStartTime);
    model.get("actuals").getFirst().get("plcCar05").set("hfStartTime",data.plcVehicleModelVO.hfStartTime);
    //车船税减免止期
    rolePath.set("hfEndTime",data.plcVehicleModelVO.hfEndTime);
    model.get("actuals").getFirst().get("plcCar05").set("hfEndTime",data.plcVehicleModelVO.hfEndTime);
    //燃料类型
    rolePath.set("fuelCode",data.plcVehicleModelVO.fuelCode);
    //行业车型代码 vehiclecode
    rolePath.set("vehiclecode",data.plcVehicleModelVO.platModelCode);
    //公告型号 announcementModel
    rolePath.set("announcementModel",data.plcVehicleModelVO.fcVehicle);
    //车型名称
    rolePath.set("platModelName",data.plcVehicleModelVO.platModelName);
    //能源种类
    //rolePath.set("energyTypesCode",data.plcVehicleModelVO.fuelName);
    //厂牌型号
    rolePath.set("carBrandCode",data.plcVehicleModelVO.standardName);
    //新车购置价
    rolePath.set("localpurchaseprice",data.plcVehicleModelVO.purchasePrice);
    //产地种类
    rolePath.set("speciesOriginCode",importFlag(speciesOrigin));
    rolePath.set("speciesOrigin",speciesOrigin.importFlag);
    //核定载质量
    rolePath.set("vehicleTonnage",data.plcVehicleModelVO.tonnage);
    rolePath.set("toncount",data.plcVehicleModelVO.tonnage);
    //排量
    if(model.get("actual.plcCar05.checkNo")==null) {
        var exhaustscale = rolePath.get("exhaustscale");
        if (handoverSearchFlag == "1") {
          if (exhaustscale == "" || exhaustscale == null || exhaustscale == undefined) {
            rolePath.set("exhaustscale", data.plcVehicleModelVO.displacement);
          }
        } else {
          rolePath.set("exhaustscale", data.plcVehicleModelVO.displacement);
        }
    }
    //功率
    rolePath.set("enginePower",data.plcVehicleModelVO.power);
    //核定载客
    if(model.get("actual.plcCar05.checkNo")==null) {
        var passengersNumber = rolePath.get("passengersNumber");
        if (handoverSearchFlag == "1") {
          if (passengersNumber == "" || passengersNumber == null || passengersNumber == undefined) {
            rolePath.set("passengersNumber", data.plcVehicleModelVO.seat);
          }
        } else {
          rolePath.set("passengersNumber", data.plcVehicleModelVO.seat);
        }

    }
    //车辆品牌
    var brandName = rolePath.get("brandName");
    if(handoverSearchFlag == "1"){
      if(brandName == "" || brandName == null || brandName == undefined){
        rolePath.set("brandName",data.plcVehicleModelVO.brandName);
      }
    }else{
      rolePath.set("brandName",data.plcVehicleModelVO.brandName);
    }
    //车辆品牌ID
    rolePath.set("brandId",data.plcVehicleModelVO.brandCode);
    ///车系ID
    rolePath.set("familyId",data.plcVehicleModelVO.familyCode);
    //车系名称
    rolePath.set("familyName",data.plcVehicleModelVO.familyName);

    //车辆类型描述
    rolePath.set("vehiclestyledesc",data.plcVehicleModelVO.standardName);
    rolePath.set("deptName",data.plcVehicleModelVO.familyName);
    rolePath.set("tradeName",data.plcVehicleModelVO.companyName);
    //车型代码
    rolePath.set("vehicleId",data.rbCode);
    rolePath.set("rbCode",data.rbCode);
    //整备质量
    if(model.get("actual.plcCar05.checkNo")==null) {

        debugger
        var vehicleQuality = rolePath.get("vehicleQuality");
        if (handoverSearchFlag == "1") {
          if (vehicleQuality == "" || vehicleQuality == null || vehicleQuality == undefined) {
            if (data.plcVehicleModelVO.fullWeightMin) {
              rolePath.set("vehicleQuality", data.plcVehicleModelVO.fullWeightMin);
            } else {
              rolePath.set("vehicleQuality", data.plcVehicleModelVO.fullWeightMax);
            }
          }
        } else {
          if (data.plcVehicleModelVO.fullWeightMin) {
            rolePath.set("vehicleQuality", data.plcVehicleModelVO.fullWeightMin);
          } else {
            rolePath.set("vehicleQuality", data.plcVehicleModelVO.fullWeightMax);
          }
        }
    }

    //分类代码
    rolePath.set("newClassCode", data.plcVehicleModelVO.newClassCode);
    //分类名称
    rolePath.set("newClassName", data.plcVehicleModelVO.newClassName);
    //风险标识
    rolePath.set("riskOtherFlag", data.plcVehicleModelVO.riskOtherFlag);
    //风险标识名称
    rolePath.set("riskOtherName", data.plcVehicleModelVO.riskOtherName);
    // 上海厂牌查询回写行业车型代码到modeCode
    if(loginStructureCode.split(0, 1) == "31")
    {
      rolePath.set("modelCode", data.plcVehicleModelVO.platModelCode);
    }
    model.action("seatCountFn")();
  }

  //对产地种类的处理
  function importFlag(n){
    var importFlag = "";
    if(n.importFlag =="0"){
      importFlag = "国产"
    }else if(n.importFlag =="1"){
      importFlag = "合资"
    }else if(n.importFlag =="2"){
      importFlag = "进口"
    }
    if(n.importFlag =="国产"){
      importFlag = "B"
    }else if(n.importFlag =="合资"){
      importFlag = "C"
    }else if(n.importFlag =="进口"){
      importFlag = "A"
    }
    return importFlag;
  }

  //对号牌种类的处理
  function licenseTypeFlag(n){
    var licenseTypeFlag = "";

    var arrLicenseType = [];
    var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode");
    var url = "";
    if(carKindCode){
      url = "controller/contract/cfgResultItem/filterLicense?baseCodeId=LicenseType05&parentId="+carKindCode;
    }else{
      url = "controller/contract/cfgResultItem/filterLicense?baseCodeId=LicenseType05";
    }
    $.ajax({
      url:url,
      ttype: "POST",
      contentType: "application/json",
      async:false,
      success: function (data) {

        data.forEach(function(item,index){
          arrLicenseType.push({key:item.kind,value:item.name})
        })

        model.set("licenseTypeList",arrLicenseType)
      },error:function(){
      }
    })
    for(var i in arrLicenseType){
      if(n == arrLicenseType[i].key){
        licenseTypeFlag = arrLicenseType[i].value;
      }
    }
    return licenseTypeFlag;
  }

  //对使用性质的处理
  function vehicleUseNatureFlag(n){
    var vehicleUseNatureFlag = "";
    var arrVehicleUseNature = [];
    var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode");
    var businessOffice=model.get("actual.businessOffice") ? model.get("actual.businessOffice") :
           (model.get("$currentUserInfo") ? model.get("$currentUserInfo.structureId") : "")
    if(carKindCode){
      $.ajax({
        url:"controller/contract/cfgResultItem/carAndUsingNature?baseCodeId=VehicleUseNature&parentId="+carKindCode+"&businessOffice="+businessOffice,
        type: "POST",
        contentType: "application/json",
        async:false,
        success: function (data) {

          data.forEach(function(item,index){
            arrVehicleUseNature.push({key:item.kind,value:item.name})
          })
          model.set("vehicleUseNatureArr",arrVehicleUseNature)
        },error:function(){
        }
      })
    }
    if(carKindCode == "" || carKindCode == null || carKindCode == undefined){
        let arrVehicleUseNatureAllYH = model.get("arrVehicleUseNatureAll");
        for(var i in arrVehicleUseNatureAllYH){
            if(n == arrVehicleUseNatureAllYH[i].key){
                vehicleUseNatureFlag = arrVehicleUseNatureAllYH[i].value;
            }
        }
    }else{
      for(var i in arrVehicleUseNature){
        if(n == arrVehicleUseNature[i].key){
          vehicleUseNatureFlag = arrVehicleUseNature[i].value;
        }
      }
    }
    return vehicleUseNatureFlag;
  }

  //对车辆类型的处理
  function vehicleStyleFlag(n){
    var vehicleStyleFlag = "";
    var arrVehicleStyle = [];
    var carKindCode = model.get("actuals").current.get("plcCar05.carKindCode")
    if(carKindCode){
      $.ajax({
        url:"controller/contract/cfgResultItem/findDrivingLicense?baseCodeId=vehiclestyle&parentId="+carKindCode,
        type: "POST",
        contentType: "application/json",
        async:false,
        success: function (data) {

          data.forEach(function(item,index){
            arrVehicleStyle.push({key:item.kind,value:item.name})
          })
          model.set("vehiclestyleList",arrVehicleStyle)
        },error:function(){
        }
      })
    }
    for(var i in arrVehicleStyle){
      if(n == arrVehicleStyle[i].key){
        vehicleStyleFlag = arrVehicleStyle[i].value;
      }
    }
    return vehicleStyleFlag;
  }

  //对产地种类的处理
  function speciesOriginFlag(n){
    var speciesOriginFlag = "";

    var arrSpeciesOriginCode = [
      {key:"全部",value:"全部"},
      {key:"A",value:"进口"},
      {key:"B",value:"国产"},
      {key:"C",value:"合资"}
    ];
    for(var i in arrSpeciesOriginCode){
      if(n == arrSpeciesOriginCode[i].key){
        speciesOriginFlag = arrSpeciesOriginCode[i].value;
      }
    }
    return speciesOriginFlag;
  }

  //对能源种类的处理
  function energyTypesCodeFlag(n){
    var energyTypesCodeFlag = "";
    var energyTypesCode = [{key:"0",value:"燃油"},{key:"1",value:"纯电动"},{key:"2",value:"燃料电池"},{key:"3",value:"插电式混合动力"},{key:"4",value:"其他混合动力"},{key:"A",value:"汽油"},
      {key:"B",value:"柴油"},{key:"C",value:"电"},{key:"D",value:"混合油"},{key:"E",value:"天然气"},{key:"F",value:"液化石油气"},{key:"L",value:"甲醇"},{key:"M",value:"乙醇"},
      {key:"N",value:"太阳能"},{key:"O",value:"混合动力"},{key:"Y",value:"无"},{key:"Z",value:"其他"}];

    for(var i in energyTypesCode){
      if(n == energyTypesCode[i].key){
        energyTypesCodeFlag = energyTypesCode[i].value;
      }
    }
    return energyTypesCodeFlag;
  }

  //对车身颜色的处理
  function colorCodeFlag(n){
    var colorCodeFlag = "";
    var colorCode = [{key:"A",value:"白"},{key:"B",value:"灰"},{key:"C",value:"黄"},{key:"D",value:"粉"},{key:"E",value:"红"},{key:"F",value:"紫"},{key:"G",value:"绿"},
      {key:"H",value:"蓝"},{key:"I",value:"棕"},{key:"J",value:"黑"},{key:"K",value:"白蓝"},{key:"Z",value:"其他"}];

    for(var i in colorCode){
      if(n == colorCode[i].key){
        colorCodeFlag = colorCode[i].value;
      }
    }
    return colorCodeFlag;
  }

  //对风险说明的处理
  function riskFlag(n){
    var riskFlag = "";
    if(n.riskFlag =="0"){
      riskFlag = "正常车型"
    }else if(n.riskFlag =="1"){
      riskFlag = "稀有车型"
    }else if(n.riskFlag =="2"){
      riskFlag = "特异车型"
    }else if(n.riskFlag =="3"){
      riskFlag = "老旧车型"
    }else if(n.riskFlag =="4"){
      riskFlag = "配件疑难车型"
    }
    return riskFlag;
  }
  //生产状态的处理
  function stopFlag(n){
    var stopFlag = "";
    if(n.stopFlag =="0"){
      stopFlag = "未停产"
    }else if(n.stopFlag =="1"){
      stopFlag = "停产"
    }else if(n.stopFlag =="2"){
      stopFlag = "预上市"
    }
    return stopFlag;
  }
  //有无ABS装置
  function absFlag(n){
    var absFlag = "";
    var antiTheft = "";
    if(n.absFlag == "0"){
      absFlag = "无";
    }else{
      absFlag = "有";
    }
    if(n.antiTheft == "0"){
      antiTheft = "无";
    }else{
      antiTheft = "有";
    }
    n.absFlag = absFlag;
    n.antiTheft = antiTheft;
  }

  if(model.get("actuals").getFirst().get("productCode") == '0515'){
    // 北京上海0515上平台必填车辆使用性质
    if(loginStructureCode.split(0, 1) == "31" || loginStructureCode.split(0, 1) == "11"){
      model.set("isSHProductSingle",true);
      model.set("certificateDateBJplay",true);
    }else{
      model.set("isSHProductSingle",false);
    }
    //上海0515初登日期显示
    if(loginStructureCode.split(0, 1) == "31"){
      model.set("isSHProductShow",true);
    }
  }else{
     model.set("isSHProductSingle",true);
     model.set("isSHProductShow", true);
  }
  if(productCode == "0515" && loginStructureCode.substring(0,2)=='31'){
	    //车险上海05015非空必填效验
	    model.get('actual.plcCar05').dataType.getProperty("enrollDate").set("validators", [{$type: "required"}]);
   }
  //页面初始化时校验上海平台车型查询按钮是否显示 start
  // 老核心只有0512-特种车、0511-商业，有车型查询
  // 验证是否交强险：&& model.get("actuals").getFirst().get("productCode") != "0507"
  if(loginStructureCode.split(0, 1) == "31" && (model.get("actuals").getFirst().get("productCode") == "0511"
    || model.get("actuals").getFirst().get("productCode") == "0512")){
    model.set("hasVehicleQuery",true);
  }else{
    model.set("hasVehicleQuery",false);
  }
  //页面初始化时校验上海平台车型查询按钮是否显示 end

///江苏验证码按钮是否显示
  var licensePlateNo =model.get("actual.plcCar05.licensePlateNo")
  if(loginStructureCode.split(0, 1) == "32"&&licensePlateNo!=undefined){
    var licensePlateNo2=licensePlateNo.substr(0,1)
    if(licensePlateNo2=='苏'){
      model.set("hasJSVehicleQuery",true);
    }else{
      model.set("hasJSVehicleQuery",false);
    }
  }
  model.set("isSHenergyTypesCode",true)
  if (loginStructureCode.split(0, 1) == "31") {
      model.set("isSHenergyTypesCode",false)
  }
    if(loginStructureCode.split(0, 1) == "31") {
        var newCarFlay=model.get("actuals.plcCar05.newCarFlag");
        var licensePlateNo;
        if (model.get("actuals.plcCar05.licensePlateNo")) {
            licensePlateNo=model.get("actuals.plcCar05.licensePlateNo").substring(0,1);
        }
        if(newCarFlay && newCarFlay == 0 && licensePlateNo && licensePlateNo == "沪") {
            model.set("actuals.plcCar05.foreignCarFlag","0");
        }
        if(newCarFlay && newCarFlay == 0 && licensePlateNo && licensePlateNo != "沪") {
            model.set("actuals.plcCar05.foreignCarFlag","1");
        }
    }
});
