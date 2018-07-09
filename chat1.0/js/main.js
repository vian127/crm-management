/*
	*date 2016-10-26
	*author lut
	*edition 1.0
*/




!function(g){
	var m=g || WebIM,dome={};
	dome.conn = new m.connection({					//创建连接
	    isMultiLoginSessions: m.config.isMultiLoginSessions,
	    https: typeof m.config.https === 'boolean' ? m.config.https : location.protocol === 'https:',
	    url: m.config.xmppURL,
	    isAutoLogin: true
	});
	dome.tag={					//当前聊天对象
		username:"cat",
	};
	dome.groupType="groupchat";
	dome.selectedCate="groups";
	dome.selected="groups";
	dome.btn=document.querySelector("#btn");					//发送按钮
	dome.sign_btn=document.querySelector("#signIn");					//登录
	dome.register_btn=document.querySelector("#register-btn");					//注册
	dome.send_btn=document.querySelector("#send-btn");					//发送
	dome.conn.listen({					//添加回调
        onOpened: function (message){          //连接成功回调
    		//如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
    		console.log(message);
    		dome.conn.setPresence();
    		dome.conn.getRoster({
	            success: function(roster) {
	            	console.log(roster)
	            }
	        });
    		// console.log(message);   
  		},  
		onClosed: function ( message ) {         //连接关闭回调
			console.log(message)
		},
		onTextMessage: function ( message ) {			    //收到文本消息
			console.log("收到文本消息"+message)
			console.log(JSON.stringify(message))
		},
		onEmojiMessage: function ( message ) {				//收到表情消息
			console.log("表情"+message);
		},   
		onPictureMessage: function ( message ) {			//收到图片消息
			console.log("收到图片消息"+message);
		}, 
		onCmdMessage: function ( message ) {},     //收到命令消息
		onAudioMessage: function ( message ) {},   //收到音频消息
		onLocationMessage: function ( message ) {},//收到位置消息
		onFileMessage: function ( message ) {},    //收到文件消息
		onVideoMessage: function ( message ) {},   //收到视频消息
		onPresence: function ( message ) {},       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
		onRoster: function ( message ) {},         //处理好友申请
		onInviteMessage: function ( message ) {},  //处理群组邀请
		onOnline: function () {alert(444)},                  //本机网络连接成功
		onOffline: function () {},                 //本机网络掉线
		onError: function ( message ) {}           //失败回调
    });
	dome.fn={					//方法
		sendTxt:function(content){					//发送文本信息
			var b=dome;
			var id = dome.conn.getUniqueId();//生成本地消息id
			var msg = new m.message('txt', id);//创建文本消息
			var chatrooms=dome.selectedCate==="chatrooms";
			msg.set({
			  	msg: content,
			  	to: b.tag.username,
			  	success: function (id,serverMsgId) {				//消息发送成功回调  
			  		console.log("发送成功");
			  	},
			  	type:"chat"
			}); 
			 
			if (dome.selectedCate==="groups") { 
			  	msg.setGroup("groupchat");
			}else if (chatrooms) {
				msg.body.roomType = true;
			  	msg.setGroup("groupchat");
			}
			dome.conn.send(msg.body);
		},
		register:function(opt){					//登录
			var options = { 
			  	username: opt.username,
			  	password: opt.password,
			  	nickname: opt.nickname,
			  	appKey: m.config.appkey,
			  	success: function (data){
			  		console.log(data);
			  	},  
			  	error: function (data){
			  		console.log(data);
			  	}, 
			  	apiUrl: m.config.apiURL
			}; 
			m.utils.registerUser(options);
		},
		signIn:function(opt){					//登录
			var options = { 
			  	apiUrl: m.config.apiURL,
			  	user: opt.username,
			  	pwd: opt.password,
			  	appKey: m.config.appkey
			};
			localStorage.setItem("ct_login",JSON.stringify({"username":opt.username,"password":opt.password,"is_sign":true}));
			dome.conn.open(options);

		},
		signOut:function(){					//登出
			dome.info.username="";
			dome.info.password="";
		},
		isSign:function(){					//判断是否登录
			var a=this;
			var ct_login=localStorage.getItem("ct_login");

			if(ct_login!=undefined && ct_login!=null){
				ct_login=JSON.parse(ct_login);
				dome.info.username=ct_login.username;
				dome.info.password=ct_login.password;
				dome.info.is_sign=true;
				a.signIn(ct_login);
			}else{
				console.log("请先登录");
			}
		}
	};
	m.Emoji = {						//第三方表情
	    path: 'images/faces/',					/*表情包路径*/
	    map: {					//项
	        '[):]': 'ee_1.png',
	        '[:D]': 'ee_2.png',
	        '[;)]': 'ee_3.png',
	        '[:-o]': 'ee_4.png',
	        '[:p]': 'ee_5.png',
	        '[(H)]': 'ee_6.png',
	        '[:@]': 'ee_7.png',
	        '[:s]': 'ee_8.png',
	        '[:$]': 'ee_9.png',
	        '[:(]': 'ee_10.png',
	        '[:\'(]': 'ee_11.png',
	        '[:|]': 'ee_12.png',
	        '[(a)]': 'ee_13.png',
	        '[8o|]': 'ee_14.png',
	        '[8-|]': 'ee_15.png',
	        '[+o(]': 'ee_16.png',
	        '[<o)]': 'ee_17.png',
	        '[|-)]': 'ee_18.png',
	        '[*-)]': 'ee_19.png',
	        '[:-#]': 'ee_20.png',
	        '[:-*]': 'ee_21.png',
	        '[^o)]': 'ee_22.png',
	        '[8-)]': 'ee_23.png',
	        '[(|)]': 'ee_24.png',
	        '[(u)]': 'ee_25.png',
	        '[(S)]': 'ee_26.png',
	        '[(*)]': 'ee_27.png',
	        '[(#)]': 'ee_28.png',
	        '[(R)]': 'ee_29.png',
	        '[({)]': 'ee_30.png',
	        '[(})]': 'ee_31.png',
	        '[(k)]': 'ee_32.png',
	        '[(F)]': 'ee_33.png',
	        '[(W)]': 'ee_34.png',
	        '[(D)]': 'ee_35.png'
	    }
	};
	dome.bind=function(){					//事件绑定
		var a=this;

		a.btn.onclick=function(){
			a.fn.sendTxt();
		};
		a.sign_btn.onclick=function(){
			var form=document.forms["sign-form"];
			var opt={
				username:form[0].value,
				password:form[1].value
			}
			for(var key in opt){
				if(opt[key]==""){
					alert("请填写"+key);
					return;
				}
			}
			a.fn.signIn(opt);
		}
		a.register_btn.onclick=function(){
			var form=document.forms["register"];
			var opt={
				username:form[0].value,
				password:form[1].value,
				nickname:form[2].value
			}
			for(var key in opt){
				if(opt[key]==""){
					alert("请填写"+key);
					return;
				}
			}
			a.fn.register(opt);
		}
		a.send_btn.onclick=function(){
			var txt=document.querySelector("#content-txt").value;
			if(txt!=""){
				a.fn.sendTxt(txt);
			}
			
		}
	};
	dome.info = {					//当前的配置
	    signIn: '登录',
	    username: '用户名',
	    password: '密码',
	    tokenSignin: '使用token登录',
	    nickname: '昵称',
	    signUp: '注册',
	    signUpSuccessfully: '注册成功',
	    notEmpty: '不能为空',
	    request: '请求添加好友',
	    add: '添加',
	    delete: '删除',
	    addAFriend: '添加好友',
	    delAFriend: '删除好友',
	    quit: '退出',
	    groups: '群组',
	    strangers: '陌生人',
	    chatrooms: '聊天室',
	    friends: '好友',
	    exceed: '请上传大小不超过10M的文件',
	    invalidType: '不支持此类型',
	    uploadFileFailed: '上传文件发生错误',
	    agree: '同意',
	    reject: '拒绝',
	    send: '发送',
	    notin: '您不在当前聊天室',
	    sendImageFailed: '图片发送失败',
	    sendAudioFailed: '发送音频失败',
	    sendFileFailed: '文件音频失败',
	    image: '图片',
	    audio: '音频',
	    file: '文件',
	    location: '位置',
	    video: '视频',
	    cmd: '命令消息',
	    download: '点击下载',
	    noaccount: '没有账号',
	    signupnow: '现在注册',
	    haveaccount: '已有账号'
	};
	dome.bind();
	dome.fn.isSign({
		// username:"lut000",
		// password:"6011100724lu",
		// nickname:"我去"
	});
}(WebIM);