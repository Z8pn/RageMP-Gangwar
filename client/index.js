(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
class CEFBrowser{constructor(e){this._setup(e)}_setup(e){this.browser=mp.browsers.new(e),this.cursorState=!1}call(){let e=Array.prototype.slice.call(arguments),r=e[0],s="(";for(let r=1;r<e.length;r++){switch(typeof e[r]){case"string":s+="'"+e[r]+"'";break;case"number":case"boolean":s+=e[r];break;case"object":s+=JSON.stringify(e[r])}r<e.length-1&&(s+=",")}r+=s+=");",this.browser.execute(r)}active(e){this.browser.active=e}get isActive(){return this.browser.active}cursor(e){this.cursorState=e,mp.gui.cursor.visible=e}}module.exports=CEFBrowser;

},{}],3:[function(require,module,exports){
require("./vector.js");var player_bones={SKEL_L_UpperArm:{bone_id:45509,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_R_UpperArm:{bone_id:40269,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_L_Forearm:{bone_id:61163,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_R_Forearm:{bone_id:28252,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_Head:{bone_id:31086,threshold:.15,offset:{x:0,y:0,z:0}},SKEL_R_Hand:{bone_id:57005,threshold:.06,offset:{x:0,y:0,z:0}},SKEL_L_Hand:{bone_id:18905,threshold:.06,offset:{x:0,y:0,z:.05}},SKEL_R_Clavicle:{bone_id:10706,threshold:.1,offset:{x:0,y:0,z:0}},SKEL_L_Clavicle:{bone_id:64729,threshold:.1,offset:{x:0,y:0,z:0}},SKEL_Spine0:{bone_id:23553,threshold:.15,offset:{x:0,y:0,z:0}},SKEL_Spine1:{bone_id:24816,threshold:.15,offset:{x:0,y:0,z:0}},SKEL_Spine2:{bone_id:24817,threshold:.15,offset:{x:0,y:0,z:0}},SKEL_Spine3:{bone_id:24818,threshold:.15,offset:{x:0,y:0,z:0}},SKEL_R_Calf:{bone_id:36864,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_L_Calf:{bone_id:63931,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_L_Thigh:{bone_id:58271,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_R_Thigh:{bone_id:51826,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_R_Foot:{bone_id:52301,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_L_Foot:{bone_id:14201,threshold:.08,offset:{x:0,y:0,z:0}},SKEL_Pelvis:{bone_id:11816,threshold:.08,offset:{x:0,y:0,z:0}}};function getVehiclePassangerEntityFromPosition(e,t){let o=[];mp.players.forEachInStreamRange(e=>{e.vehicle==t&&o.push(e)});let i={dist:9999,target:null};return o.forEach(function(t){let o=t.position,r=mp.game.system.vdist2(e.x,e.y,e.z,o.x,o.y,o.z);r<i.dist&&(i.dist=r,i.target=t)}),i}function getIsHitOnBone(e,t){let o="",i=99;if(null!=t)for(let r in player_bones){let s=player_bones[r].bone_id,n=player_bones[r].offset,a=player_bones[r].threshold,l=mp.players.local.getBoneCoords(12844,0,0,0),d=t.getBoneCoords(s,n.x,n.y,n.z);mp.raycasting.testPointToPoint(e,d,mp.players.local,2);if(mp.game.system.vdist(e.x,e.y,e.z,d.x,d.y,d.z)<1.6){let t=new mp.Vector3(e.x-l.x,e.y-l.y,e.z-l.z),s=mp.game.system.vdist(e.x,e.y,e.z,l.x,l.y,l.z),n=t.normalize(s),m=mp.game.system.vdist(d.x,d.y,d.z,l.x,l.y,l.z),h=n.multiply(m),_=mp.game.system.vdist(d.x,d.y,d.z,l.x+h.x,l.y+h.y,l.z+h.z);i>_&&_<=a&&(o=r,i=_)}}return{hit:""!=o,bone:o,dist:i}}mp.events.add("playerWeaponShot",(e,t)=>{let o=mp.players.local.weapon,i=mp.players.local.getAmmoInClip(o);if(mp.events.callRemote("Combat:FireWeapon",o.toString(),i),mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),t)if(t.isInAnyVehicle(!1)){let i=t.vehicle,r=getVehiclePassangerEntityFromPosition(e,i),s=getIsHitOnBone(e,r.target);1==s.hit?mp.events.callRemote("Combat:HitEntity",r.target,o.toString(),s.bone):mp.events.callRemote("Combat:HitEntity",i,o.toString())}else{let i=getIsHitOnBone(e,t);mp.events.callRemote("Combat:HitEntity",t,o.toString(),i.bone)}});var timerHitmarker=0;mp.events.add("render",()=>{mp.game.player.resetStamina(),mp.game.graphics.hasStreamedTextureDictLoaded("hud_reticle")||mp.game.graphics.requestStreamedTextureDict("hud_reticle",!0),mp.game.graphics.hasStreamedTextureDictLoaded("hud_reticle")&&Date.now()/1e3-timerHitmarker<=.1&&mp.game.graphics.drawSprite("hud_reticle","reticle_ar",.5,.5,.025,.04,45,255,255,255,150)}),mp.events.add("Combat:HitEntity",()=>{timerHitmarker=Date.now()/1e3}),mp.events.add("Combat:Hitted",e=>{});

},{"./vector.js":16}],4:[function(require,module,exports){
const movementClipSet="move_ped_crouched",strafeClipSet="move_ped_crouched_strafing",clipSetSwitchTime=.25,loadClipSet=e=>{for(mp.game.streaming.requestClipSet(e);!mp.game.streaming.hasClipSetLoaded(e);)mp.game.wait(0)};loadClipSet(movementClipSet),loadClipSet(strafeClipSet),mp.events.add("entityStreamIn",e=>{"player"===e.type&&e.getVariable("isCrouched")&&(e.setMovementClipset(movementClipSet,.25),e.setStrafeClipset(strafeClipSet))}),mp.events.add("entityDataChange",(e,t,p)=>{"player"===e.type&&"isCrouched"===t&&(p?(e.setMovementClipset(movementClipSet,.25),e.setStrafeClipset(strafeClipSet)):(e.resetMovementClipset(.25),e.resetStrafeClipset()))}),mp.keys.bind(17,!1,()=>{mp.events.callRemote("Player:Crouch")});

},{}],5:[function(require,module,exports){
module.exports=new class{constructor(){this._setup()}_setup(o){this.hudComponentID=19,this.rankBarColor=27}showEXPBar(o,e,a,m,r){if(!mp.game.graphics.hasHudScaleformLoaded(this.hudComponentID)){for(mp.game.graphics.requestHudScaleform(this.hudComponentID);!mp.game.graphics.hasHudScaleformLoaded(this.hudComponentID);)mp.game.wait(0);mp.game.graphics.pushScaleformMovieFunctionFromHudComponent(this.hudComponentID,"SET_COLOUR"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(this.rankBarColor),mp.game.graphics.popScaleformMovieFunctionVoid()}mp.game.graphics.pushScaleformMovieFunctionFromHudComponent(this.hudComponentID,"SET_RANK_SCORES"),mp.game.graphics.pushScaleformMovieFunctionParameterInt(o),mp.game.graphics.pushScaleformMovieFunctionParameterInt(e),mp.game.graphics.pushScaleformMovieFunctionParameterInt(a),mp.game.graphics.pushScaleformMovieFunctionParameterInt(m),mp.game.graphics.pushScaleformMovieFunctionParameterInt(r),mp.game.graphics.popScaleformMovieFunctionVoid()}};

},{}],6:[function(require,module,exports){
var natives=require("./natives.js");function inside(t,i){let e=t[0],s=t[1],a=!1;for(let t=0,n=i.length-1;t<i.length;n=t++){let r=i[t][0],o=i[t][1],h=i[n][0],l=i[n][1];o>s!=l>s&&e<(h-r)*(s-o)/(l-o)+r&&(a=!a)}return a}var Gangturf=class{constructor(t,i,e,s,a,n,r,o){this._setup(t,i,e,s,a,n,r,o)}_setup(t,i,e,s,a,n,r,o){this.name=t,this.id=i,this.range=a,this.color=n,this.position={x:e,y:s,z:123},this.rotation=r,this.blip=null,this._colshape=null,this._status=!0,this._entered=!1,this._isEntering=!1,this._inColshape=!1,this._timerCheck,this._owner=o,this.loadArea()}loadArea(){this.blip=mp.game.ui.addBlipForRadius(this.position.x,this.position.y,1,this.range),natives.SET_BLIP_SPRITE(this.blip,5),natives.SET_BLIP_ALPHA(this.blip,70),this._colshape=mp.colshapes.newCircle(this.position.x,this.position.y,1.5*this.range),natives.SET_BLIP_COLOUR(this.blip,this.color)}render(){this.blip&&natives.SET_BLIP_ROTATION(this.blip,this.rotation)}updateArea(t,...i){return"attack"==t?(this._status="attack",void natives.SET_BLIP_FLASHES(this.blip,!0)):"normal"==t?(this._status="normal",void natives.SET_BLIP_FLASHES(this.blip,!1)):"conquered"==t?(this._status="conquered",this._owner=i[1],natives.SET_BLIP_FLASHES(this.blip,!1),void natives.SET_BLIP_COLOUR(this.blip,i[0])):void 0}destroy(){mp.game.ui.removeBlip(this.blip),this._colshape.destroy()}isTurfArea(t){return t==this._colshape}isOwner(t){return t==this._owner}check(){this._entered?1==this._entered&&(this.isInsideArea()&&0!=this.isNearGround()||(this._entered=!1,mp.events.call("Gangarea:Leave",this),mp.events.callRemote("Gangarea:Leave",this.id))):this.isInsideArea()&&1==this.isNearGround()&&(this._entered=!0,mp.events.call("Gangarea:Enter",this),mp.events.callRemote("Gangarea:Enter",this.id))}enter(){var t=this;t._timerCheck=setInterval(function(){t.check()},1e3)}leave(){clearInterval(this._timerCheck),this.check()}isNearGround(){let t=mp.game.gameplay.getGroundZFor3dCoord(this.position.x,this.position.y,9e3,0,!1);return mp.game.system.vdist(0,0,t,0,0,mp.players.local.position.z)<=75}isInsideArea(){let t={x:mp.players.local.position.x,y:mp.players.local.position.y,z:mp.players.local.position.z};var i=Math.sqrt(1.2*this.range*(1.2*this.range)+1.2*this.range/2*(1.2*this.range/2));let e=(this.rotation+45)*(Math.PI/180),s={x:this.position.x+i*Math.cos(e),y:this.position.y+i*Math.sin(e)};e=(this.rotation+135)*(Math.PI/180);let a={x:this.position.x+i*Math.cos(e),y:this.position.y+i*Math.sin(e)};e=(this.rotation+225)*(Math.PI/180);let n={x:this.position.x+i*Math.cos(e),y:this.position.y+i*Math.sin(e)};e=(this.rotation+315)*(Math.PI/180);let r={x:this.position.x+i*Math.cos(e),y:this.position.y+i*Math.sin(e)};return!!inside([t.x,t.y],[[s.x,s.y],[a.x,a.y],[n.x,n.y],[r.x,r.y]])}},gangturfs=[];function clearBlips(){natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT(!0);let t=natives.GET_FIRST_BLIP_INFO_ID(5);for(;natives.DOES_BLIP_EXIST(t);)mp.game.ui.removeBlip(t),t=natives.GET_NEXT_BLIP_INFO_ID(5);mp.game.wait(50)}mp.events.add("playerEnterColshape",function(t){let i;gangturfs.forEach(function(e,s){1==e.isTurfArea(t)&&(i=e)}),i&&i.isTurfArea(t)&&i.enter()}),mp.events.add("playerExitColshape",function(t){let i;gangturfs.forEach(function(e,s){1==e.isTurfArea(t)&&(i=e)}),i&&i.isTurfArea(t)&&i.leave()}),mp.events.add("render",()=>{gangturfs.forEach(function(t,i){t.render()})}),mp.events.add("GangAreas:Create",function(t){clearBlips(),t.length>0&&t.forEach(function(t){null!=t.turf_id&&(gangturfs[gangturfs.length+1]=new Gangturf(t.name,t.turf_id,t.position.x,t.position.y,t.range,t.color,t.rotation,t.owner))})});

},{"./natives.js":10}],7:[function(require,module,exports){
require("./scaleforms/index.js"),require("./team_change.js"),require("./combat.js"),require("./money.js"),require("./nametag.js"),require("./crouch.js"),require("./armour.js"),require("./gangwars.js");var LastCam,natives=require("./natives.js"),exp=require("./exp.js"),wasted=require("./wasted.js"),CEFBrowser=require("./browser.js"),Browser=new CEFBrowser("package://gangwar_client/cef/index.html");function clearBlips(){natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT(!0);let e=natives.GET_FIRST_BLIP_INFO_ID(5);for(;natives.DOES_BLIP_EXIST(e);)mp.game.ui.removeBlip(e),e=natives.GET_NEXT_BLIP_INFO_ID(5);mp.game.wait(50)}mp.events.callRemote("ServerAccount:Ready"),mp.game.graphics.transitionToBlurred(1),mp.events.add("Server:RequestLogin",()=>{clearBlips(),(LastCam=mp.cameras.new("default",new mp.Vector3(593.5968627929688,-1820.015869140625,142.7814483642578),new mp.Vector3,60)).pointAtCoord(163.39794921875,-1788.3284912109375,27.982322692871094),LastCam.setActive(!0),mp.game.cam.renderScriptCams(!0,!1,0,!0,!1),mp.game.ui.displayHud(!1),mp.game.ui.displayRadar(!1),mp.game.graphics.transitionToBlurred(1),Browser.cursor(!0),setTimeout(function(){Browser.call("cef_loadlogin",mp.players.local.name)},100)}),mp.events.add("Account:Alert",function(...e){Browser.call("alert_login",e[0])}),mp.events.add("Account:HideLogin",()=>{mp.game.graphics.transitionFromBlurred(500),Browser.cursor(!1),Browser.call("cef_hidelogin")}),mp.events.add("Account:LoginDone",()=>{mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setHealthRechargeMultiplier(0),mp.game.ui.displayRadar(!0),mp.game.ui.displayHud(!0),mp.game.ui.setMinimapVisible(!1)}),mp.events.add("Cam:Hide",()=>{mp.game.graphics.transitionFromBlurred(100),LastCam.setActive(!1),mp.game.cam.renderScriptCams(!1,!1,0,!0,!1),mp.game.ui.displayRadar(!0),mp.game.ui.displayHud(!0),mp.game.ui.setMinimapVisible(!1),mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setHealthRechargeMultiplier(0)}),mp.events.add("entityStreamIn",e=>{"player"===e.type&&(mp.game.player.setTargetingMode(1),mp.game.player.setLockon(!1),mp.game.player.setLockonRangeOverride(0),mp.players.local.setOnlyDamagedByPlayer(!1),mp.players.local.setProofs(!0,!1,!1,!1,!1,!1,!1,!1),mp.game.player.setLockonRangeOverride(0))}),mp.events.add("Account:Login",(e,a)=>{mp.events.callRemote("ServerAccount:Login",e,a)}),mp.events.add("Account:Register",(e,a,l)=>{mp.events.callRemote("ServerAccount:Register",e,a,l)}),mp.events.add("Player:Death",e=>{wasted.show(e)}),mp.events.add("Player:Spawn",()=>{wasted.hide()}),mp.events.add("Player:LevelUp",function(e,a){mp.game.audio.playSoundFrontend(-1,"Mission_Pass_Notify","DLC_HEISTS_GENERAL_FRONTEND_SOUNDS",!0),Browser.call("notify",{title:"Congratulations",titleSize:"16px",message:`You just leveled up to Level ${a}`,messageColor:"rgba(0,0,0,.9)",position:"topCenter",close:!1})}),mp.events.add("Player:UnlockWeapons",function(e,a){mp.game.audio.playSoundFrontend(-1,"CHALLENGE_UNLOCKED","HUD_AWARDS",!0),null!=e&&Browser.call("notify",{title:"Standart",titleSize:"16px",message:`${e} just got unlocked`,messageColor:"rgba(0,50,0,.8)",position:"topCenter",backgroundColor:"rgba(86, 206, 86, 0.9)",close:!1}),null!=a&&a.length>0&&a.forEach(function(e){Browser.call("notify",{title:"Buyable",titleSize:"16px",message:`${e} just got unlocked`,messageColor:"rgba(0,50,0,.8)",position:"topCenter",backgroundColor:"rgba(86, 206, 86, 0.9)",close:!1})})});let weaponshop_visible=!1;mp.events.add("WeaponShop:show",e=>{0==weaponshop_visible?(Browser.call("cef_loadweapons",e),Browser.call("cef_showweaponshop"),weaponshop_visible=!0,Browser.cursor(!0)):(Browser.call("cef_hideweaponshop"),weaponshop_visible=!1,Browser.cursor(!1))}),mp.keys.bind(114,!1,function(){mp.events.callRemote("WeaponShop:toggle",weaponshop_visible)}),mp.events.add("WeaponShop:Buy",e=>{mp.events.callRemote("WeaponShop:Buy",e)}),mp.events.add("VehicleShop:Buy",e=>{mp.events.callRemote("VehicleShop:Buy",e)}),mp.events.add("VehicleShop:Close",e=>{Browser.call("cef_hidevehicles"),Browser.cursor(!1)}),mp.events.add("VehicleShop:Show",e=>{Browser.call("cef_loadvehicles",e),Browser.call("cef_showvehicles"),Browser.cursor(!0)}),mp.keys.bind(69,!1,function(){1==mp.players.local.getVariable("teamColshape")&&mp.events.callRemote("VehicleShop:Show")}),mp.events.add("Teams:Change",e=>{mp.players.local.position=e[0].preview.spawn,mp.players.local.setHeading(e[0].preview.heading),mp.players.local.model=mp.game.joaat(e[0].skins[0].name),natives.SET_PED_CURRENT_WEAPON_VISIBLE(mp.players.local.handle,!1,!0,!0,!0),mp.players.local.mugshotboard.show("","",e[0].name,""),setTimeout(function(){let a=mp.cameras.new("default",e[0].preview.cam,new mp.Vector3,50);a.pointAtCoord(e[0].preview.spawn.x,e[0].preview.spawn.y,e[0].preview.spawn.z),a.setActiveWithInterp(LastCam.handle,500,1,2),LastCam=a,mp.game.cam.renderScriptCams(!0,!1,0,!0,!1),mp.game.ui.displayHud(!1),mp.game.ui.displayRadar(!1),Browser.cursor(!0),Browser.call("cef_loadteams",e),Browser.call("cef_showteam")},100)});let team_change={skin:0,team:0},cooldown_skin=0,cooldown_team=0;mp.events.add("Teams:UpdateTeamData",(e,a)=>{team_change={skin:a,team:e}}),mp.events.add("Teams:JoinTeam",()=>{Browser.call("cef_hideteam"),Browser.cursor(!1),mp.game.graphics.transitionToBlurred(0),setTimeout(function(){mp.players.local.mugshotboard.hide(),mp.events.callRemote("Teams:Set",team_change.team,team_change.skin)},400)}),mp.events.add("Teams:UpdateSkin",(e,a)=>{Date.now()/1e3-cooldown_skin>=.05&&(mp.players.local.mugshotboard.hide(),mp.players.local.model=mp.game.joaat(a),mp.players.local.mugshotboard.show("","",e,""),cooldown_skin=Date.now()/1e3)}),mp.events.add("Teams:UpdateTeam",e=>{if(Date.now()/1e3-cooldown_team>=.05){e=JSON.parse(e);let a=mp.cameras.new("default",e.cam,new mp.Vector3,50);a.pointAtCoord(e.spawn.x,e.spawn.y,e.spawn.z),a.setActiveWithInterp(LastCam.handle,500,1,2),LastCam=a,mp.game.cam.renderScriptCams(!0,!1,0,!0,!1),mp.game.ui.displayHud(!1),mp.game.ui.displayRadar(!1),setTimeout(function(){mp.players.local.position=e.spawn,mp.players.local.setHeading(e.heading),mp.players.local.mugshotboard.anim(),natives.SET_PED_CURRENT_WEAPON_VISIBLE(mp.players.local.handle,!1,!0,!0,!0)},100),cooldown_team=Date.now()/1e3}}),mp.events.add("Notifications:New",e=>{Browser.call("notify",e)}),mp.events.add("Player:Collision",e=>{1==e?mp.vehicles.forEach(e=>{mp.players.local.vehicle&&(mp.players.local.vehicle.setNoCollision(e.handle,!0),natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle,e,!0),natives.SET_ENTITY_NO_COLLISION_ENTITY(e,mp.players.local.vehicle,!0)),e.setAlpha(255)}):mp.vehicles.forEach(e=>{mp.players.local.vehicle&&(mp.players.local.vehicle.setNoCollision(e.handle,!1),natives.SET_ENTITY_NO_COLLISION_ENTITY(e,mp.players.local.vehicle,!1),natives.SET_ENTITY_NO_COLLISION_ENTITY(mp.players.local.vehicle,e,!1)),e.setAlpha(150)})});let level_view_visible=!1;mp.keys.bind(115,!1,function(){mp.events.callRemote("LevelView:toggle",level_view_visible)}),mp.events.add("LevelView:Show",e=>{mp.gui.chat.push("Show "+JSON.stringify(e)),0==level_view_visible?(Browser.call("cef_loadlevels",e),Browser.call("cef_showlevels"),level_view_visible=!0,Browser.cursor(!0)):(Browser.call("cef_hidelevels"),level_view_visible=!1,Browser.cursor(!1))});

},{"./armour.js":1,"./browser.js":2,"./combat.js":3,"./crouch.js":4,"./exp.js":5,"./gangwars.js":6,"./money.js":8,"./nametag.js":9,"./natives.js":10,"./scaleforms/index.js":14,"./team_change.js":15,"./wasted.js":17}],8:[function(require,module,exports){
const HUD_CASH=3,SET_TEXT_OUTLINE="0x2513DFB0FB8400FE",moneyColor=[114,204,114,255],moneyNegativeColor=[224,50,50,255],moneyChangePlus=[240,240,240,255],moneyChangeMinus=[194,80,80,255],drawX=.9999,drawY=.04,fontScale=.562,diffDisplayTime=3500;let moneySet=!1,currentMoney=0,currentMoneyText="$0",changeColor=moneyChangePlus,changeText="",changeTime=0;function drawText(e,n,t,a,m){mp.game.ui.setTextEntry("STRING"),mp.game.ui.addTextComponentSubstringPlayerName(e),mp.game.ui.setTextFont(t),mp.game.ui.setTextScale(m,m),mp.game.ui.setTextColour(a[0],a[1],a[2],a[3]),mp.game.ui.setTextRightJustify(!0),mp.game.ui.setTextWrap(0,n[0]),mp.game.invoke(SET_TEXT_OUTLINE),mp.game.ui.drawText(n[0],n[1])}function numberWithCommas(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}mp.events.add("HUD:UpdateMoney",e=>{if(moneySet){let n=e-currentMoney;n<0?(changeColor=moneyChangeMinus,changeText=`-$${numberWithCommas(Math.abs(n))}`,changeTime=Date.now()+3500):n>0&&(changeColor=moneyChangePlus,changeText=`+$${numberWithCommas(n)}`,changeTime=Date.now()+3500)}else moneySet=!0;currentMoneyText=(currentMoney=e)<0?`-$${numberWithCommas(Math.abs(currentMoney))}`:`$${numberWithCommas(currentMoney)}`}),mp.events.add("render",()=>{mp.game.ui.hideHudComponentThisFrame(3);let e=mp.game.graphics.getSafeZoneSize(),n=.9999-.5*(1-e),t=.04+.5*(1-e);drawText(currentMoneyText,[n,t],7,currentMoney<0?moneyNegativeColor:moneyColor,.562),Date.now()<changeTime&&drawText(changeText,[n,t+.038],7,changeColor,.562)});

},{}],9:[function(require,module,exports){
function lerp(e,l,a){return(1-a)*e+a*l}mp.nametags.enabled=!1,mp.gui.chat.colors=!0;let blips=[];mp.events.add("entityStreamOut",e=>{"player"==e.type&&blips[e.id]&&(blips[e.id].destroy(),blips[e.id]=null,delete blips[e.id])}),mp.events.add("render",e=>{null!=mp.players.local.getVariable("team")&&mp.players.forEachInStreamRange(function(e){e!=mp.players.local&&(e.getVariable("team")==mp.players.local.getVariable("team")?(blips[e.id]||(blips[e.id]=mp.blips.new(1,e.position,{color:e.getVariable("team_color")||0,shortRange:!0,scale:.8,alpha:200,name:"Ally"}),blips[e.id].setShowHeadingIndicator(!0),blips[e.id].setCategory(1)),blips[e.id].setCoords(e.position),blips[e.id].setRotation(e.getPhysicsHeading())):blips[e.id]&&(blips[e.id].destroy(),blips[e.id]=null,delete blips[e.id]))});let l=mp.players.local.getBoneCoords(12844,.5,0,0);1==mp.players.local.getVariable("loggedIn")&&1==mp.players.local.getVariable("spawned")&&mp.players.forEachInStreamRange(e=>{if(mp.game.system.vdist2(l.x,l.y,l.z,e.position.x,e.position.y,e.position.z)<600&&1==e.getVariable("loggedIn")&&1==e.getVariable("spawned")){let a=e.getBoneCoords(12844,0,0,0);if(!mp.raycasting.testPointToPoint(l,a,mp.players.local,273)&&e.getVariable("team_rgb_color")&&e.getVariable("team_name")){let l=[255,255,255,200],a=e.getVariable("team_rgb_color"),t=e.getVariable("level");a[3]=180;let i=lerp(170,255,.01*e.getHealth()),o=lerp(30,255,.01*e.getHealth()),s=lerp(30,255,.01*e.getHealth());.01*e.getHealth()<.2?(l[0]=170,l[1]=30,l[2]=30):(l[0]=i,l[1]=o,l[2]=s);let n=mp.players.local.position,r=e.getWorldPositionOfBone(e.getBoneIndexByName("IK_Head"));if(e.isInAnyVehicle(!1)&&null!=e.vehicle){let l=null;if(e.vehicle.getPedInSeat(-1)==e.handle?l=e.vehicle.getWorldPositionOfBone(e.vehicle.getBoneIndexByName("seat_dside_f")):e.vehicle.getPedInSeat(0)==e.handle?l=e.vehicle.getWorldPositionOfBone(e.vehicle.getBoneIndexByName("seat_pside_f")):e.vehicle.getPedInSeat(1)==e.handle?l=e.vehicle.getWorldPositionOfBone(e.vehicle.getBoneIndexByName("seat_dside_r")):e.vehicle.getPedInSeat(2)==e.handle&&(l=e.vehicle.getWorldPositionOfBone(e.vehicle.getBoneIndexByName("seat_pside_r"))),null!=l){let a=e.vehicle.getOffsetFromGivenWorldCoords(l.x,l.y,l.z);mp.game.system.vdist2(l.x,l.y,l.z,r.x,r.y,r.z)<25?r=e.vehicle.getOffsetFromInWorldCoords(a.x,a.y,a.z+1.2):r.z+=.5}}else r.z+=.4;let p=lerp(.5,.06,1/800*mp.game.system.vdist2(n.x,n.y,n.z,r.x,r.y,r.z));p>.5?p=.5:p<.06&&(p=.06),mp.game.graphics.setDrawOrigin(r.x,r.y,r.z,0),mp.game.graphics.drawText(e.name,[0,0],{font:4,color:l,scale:[p,p],outline:!0});let d=p;null!=t&&(mp.game.graphics.drawText("Level "+t,[0,.055*d],{font:4,color:[255,255,255,200],scale:[.6*p,.6*p],outline:!0}),d+=.6*p),mp.game.graphics.drawText(e.getVariable("team_name"),[0,.055*d],{font:4,color:a,scale:[.6*p,.6*p],outline:!0}),mp.game.graphics.clearDrawOrigin()}}})});

},{}],10:[function(require,module,exports){
var natives={};mp.game.graphics.clearDrawOrigin=(()=>mp.game.invoke("0xFF0B610F6BE0D7AF")),natives.START_PLAYER_TELEPORT=((E,e,_,a,i,n,m,A)=>mp.game.invoke("0xAD15F075A4DA0FDE",E,e,_,a,i,n,m,A)),natives.CHANGE_PLAYER_PED=((E,e,_)=>mp.game.invoke("0x048189FAC643DEEE",E,e,_)),natives.SET_PED_CURRENT_WEAPON_VISIBLE=((E,e,_,a,i)=>mp.game.invoke("0x0725A4CCFDED9A70",E,e,_,a,i)),natives.SET_BLIP_SPRITE=((E,e)=>mp.game.invoke("0xDF735600A4696DAF",E,e)),natives.SET_BLIP_ALPHA=((E,e)=>mp.game.invoke("0x45FF974EEE1C8734",E,e)),natives.SET_BLIP_COLOUR=((E,e)=>mp.game.invoke("0x03D7FB09E75D6B7E",E,e)),natives.SET_BLIP_ROTATION=((E,e)=>mp.game.invoke("0xF87683CDF73C3F6E",E,e)),natives.SET_BLIP_FLASHES=((E,e)=>mp.game.invoke("0xB14552383D39CE3E",E,e)),natives.SET_BLIP_FLASH_TIMER=((E,e)=>mp.game.invoke("0xD3CD6FD297AE87CC",E,e)),natives.SET_BLIP_COORDS=((E,e,_,a)=>mp.game.invoke("0xAE2AF67E9D9AF65D",E,e,_,a)),natives.SET_CURSOR_LOCATION=((E,e)=>mp.game.invoke("0xFC695459D4D0E219",E,e)),natives.SET_THIS_SCRIPT_CAN_REMOVE_BLIPS_CREATED_BY_ANY_SCRIPT=(E=>mp.game.invoke("0xB98236CAAECEF897",E)),natives.GET_FIRST_BLIP_INFO_ID=(E=>mp.game.invoke("0x1BEDE233E6CD2A1F",E)),natives.GET_NEXT_BLIP_INFO_ID=(E=>mp.game.invoke("0x14F96AA50D6FBEA7",E)),natives.DOES_BLIP_EXIST=(E=>mp.game.invoke("0xA6DB27D19ECBB7DA",E)),natives.GET_NUMBER_OF_ACTIVE_BLIPS=(()=>mp.game.invoke("0x9A3FF3DE163034E8")),natives.SET_BLIP_SCALE=((E,e)=>mp.game.invoke("0xD38744167B2FA257",E,e)),natives.SET_ENTITY_NO_COLLISION_ENTITY=((E,e,_)=>mp.game.invoke("0xA53ED5520C07654A",E.handle,e.handle,_)),module.exports=natives;

},{}],11:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");let bigMessageScaleform=null,bigMsgInit=0,bigMsgDuration=5e3,bigMsgAnimatedOut=!1;mp.events.add("ShowWeaponPurchasedMessage",(e,g,s,a=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_WEAPON_PURCHASED",e,g,s),bigMsgInit=Date.now(),bigMsgDuration=a,bigMsgAnimatedOut=!1}),mp.events.add("ShowPlaneMessage",(e,g,s,a=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_PLANE_MESSAGE",e,g,s),bigMsgInit=Date.now(),bigMsgDuration=a,bigMsgAnimatedOut=!1}),mp.events.add("ShowShardMessage",(e,g,s,a,i=5e3)=>{null==bigMessageScaleform&&(bigMessageScaleform=new messageScaleform("mp_big_message_freemode")),bigMessageScaleform.callFunction("SHOW_SHARD_CENTERED_MP_MESSAGE",e,g,s,a),bigMsgInit=Date.now(),bigMsgDuration=i,bigMsgAnimatedOut=!1}),mp.events.add("render",()=>{null!=bigMessageScaleform&&(bigMessageScaleform.renderFullscreen(),bigMsgInit>0&&Date.now()-bigMsgInit>bigMsgDuration&&(bigMsgAnimatedOut?(bigMsgInit=0,bigMessageScaleform.dispose(),bigMessageScaleform=null):(bigMessageScaleform.callFunction("TRANSITION_OUT"),bigMsgAnimatedOut=!0,bigMsgDuration+=750)))});

},{"./Scaleform.js":13}],12:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");let midsizedMessageScaleform=null,msgInit=0,msgDuration=5e3,msgAnimatedOut=!1,msgBgColor=0;mp.events.add("ShowMidsizedMessage",(e,s,m=5e3)=>{null==midsizedMessageScaleform&&(midsizedMessageScaleform=new messageScaleform("midsized_message")),midsizedMessageScaleform.callFunction("SHOW_MIDSIZED_MESSAGE",e,s),msgInit=Date.now(),msgDuration=m,msgAnimatedOut=!1}),mp.events.add("ShowMidsizedShardMessage",(e,s,m,a,i,d=5e3)=>{null==midsizedMessageScaleform&&(midsizedMessageScaleform=new messageScaleform("midsized_message")),midsizedMessageScaleform.callFunction("SHOW_SHARD_MIDSIZED_MESSAGE",e,s,m,a,i),msgInit=Date.now(),msgDuration=d,msgAnimatedOut=!1,msgBgColor=m}),mp.events.add("render",()=>{null!=midsizedMessageScaleform&&(midsizedMessageScaleform.renderFullscreen(),msgInit>0&&Date.now()-msgInit>msgDuration&&(msgAnimatedOut?(msgInit=0,midsizedMessageScaleform.dispose(),midsizedMessageScaleform=null):(midsizedMessageScaleform.callFunction("SHARD_ANIM_OUT",msgBgColor),msgAnimatedOut=!0,msgDuration+=750)))});

},{"./Scaleform.js":13}],13:[function(require,module,exports){
class BasicScaleform{constructor(e){for(this.handle=mp.game.graphics.requestScaleformMovie(e);!mp.game.graphics.hasScaleformMovieLoaded(this.handle);)mp.game.wait(0)}callFunction(e,...a){mp.game.graphics.pushScaleformMovieFunction(this.handle,e),a.forEach(e=>{switch(typeof e){case"string":mp.game.graphics.pushScaleformMovieFunctionParameterString(e);break;case"boolean":mp.game.graphics.pushScaleformMovieFunctionParameterBool(e);break;case"number":Number(e)===e&&e%1!=0?mp.game.graphics.pushScaleformMovieFunctionParameterFloat(e):mp.game.graphics.pushScaleformMovieFunctionParameterInt(e)}}),mp.game.graphics.popScaleformMovieFunctionVoid()}renderFullscreen(){mp.game.graphics.drawScaleformMovieFullscreen(this.handle,255,255,255,255,!1)}dispose(){mp.game.graphics.setScaleformMovieAsNoLongerNeeded(this.handle)}}module.exports=BasicScaleform;

},{}],14:[function(require,module,exports){
var messageScaleform=require("./Scaleform.js");require("./BigMessage.js"),require("./MidsizedMessage.js"),mp.game.ui.messages={showShard:(e,s,a,d,h=5e3)=>mp.events.call("ShowShardMessage",e,s,a,d,h),showWeaponPurchased:(e,s,a,d=5e3)=>mp.events.call("ShowWeaponPurchasedMessage",e,s,a,d),showPlane:(e,s,a,d=5e3)=>mp.events.call("ShowPlaneMessage",e,s,a,d),showMidsized:(e,s,a=5e3)=>mp.events.call("ShowMidsizedMessage",e,s,a),showMidsizedShard:(e,s,a,d,h,i=5e3)=>mp.events.call("ShowMidsizedShardMessage",e,s,a,d,h,i)};

},{"./BigMessage.js":11,"./MidsizedMessage.js":12,"./Scaleform.js":13}],15:[function(require,module,exports){
mp.players.local.mugshotboard={show:(e,a,r,t,n=-1)=>mp.events.call("ShowMugshotBoard",e,a,r,t,n),hide:()=>mp.events.call("HideMugshotBoard"),anim:()=>mp.events.call("setMugshotAnimation")};const scriptConst={boardPropName:"prop_police_id_board",textPropName:"prop_police_id_text",renderTargetName:"ID_Text",animDictionary:"mp_character_creation@lineup@male_a",animName:"loop_raised"};let scriptHandles={boardHandle:null,textHandle:null,scaleformHandle:null,renderTargetID:null};mp.events.add("setMugshotAnimation",()=>{for(mp.game.streaming.requestAnimDict(scriptConst.animDictionary);!mp.game.streaming.hasAnimDictLoaded(scriptConst.animDictionary);)mp.game.wait(0);mp.players.local.taskPlayAnim(scriptConst.animDictionary,scriptConst.animName,8,-8,-1,1,0,!1,!1,!1)}),mp.events.add("ShowMugshotBoard",(e,a,r,t,n=-1)=>{if(null==scriptHandles.boardHandle){for(scriptHandles.boardHandle=mp.objects.new(mp.game.joaat(scriptConst.boardPropName),mp.players.local.position,{rotation:new mp.Vector3,alpha:255,dimension:mp.players.local.dimension}),scriptHandles.textHandle=mp.objects.new(mp.game.joaat(scriptConst.textPropName),mp.players.local.position,{rotation:new mp.Vector3,alpha:255,dimension:mp.players.local.dimension}),scriptHandles.scaleformHandle=mp.game.graphics.requestScaleformMovie("mugshot_board_01");!mp.game.graphics.hasScaleformMovieLoaded(scriptHandles.scaleformHandle);)mp.game.wait(0);for(mp.game.graphics.pushScaleformMovieFunction(scriptHandles.scaleformHandle,"SET_BOARD"),mp.game.graphics.pushScaleformMovieFunctionParameterString(e),mp.game.graphics.pushScaleformMovieFunctionParameterString(r),mp.game.graphics.pushScaleformMovieFunctionParameterString(t),mp.game.graphics.pushScaleformMovieFunctionParameterString(a),mp.game.graphics.pushScaleformMovieFunctionParameterInt(0),n>-1&&mp.game.graphics.pushScaleformMovieFunctionParameterInt(n),mp.game.graphics.popScaleformMovieFunctionVoid(),mp.game.ui.registerNamedRendertarget(scriptConst.renderTargetName,!1),mp.game.ui.linkNamedRendertarget(mp.game.joaat(scriptConst.textPropName)),scriptHandles.renderTargetID=mp.game.ui.getNamedRendertargetRenderId(scriptConst.renderTargetName),scriptHandles.boardHandle.attachTo(mp.players.local.handle,mp.players.local.getBoneIndex(28422),0,0,0,0,0,0,!1,!1,!1,!1,2,!0),scriptHandles.textHandle.attachTo(mp.players.local.handle,mp.players.local.getBoneIndex(28422),0,0,0,0,0,0,!1,!1,!1,!1,2,!0),mp.game.streaming.requestAnimDict(scriptConst.animDictionary);!mp.game.streaming.hasAnimDictLoaded(scriptConst.animDictionary);)mp.game.wait(0);mp.players.local.taskPlayAnim(scriptConst.animDictionary,scriptConst.animName,8,-8,-1,1,0,!1,!1,!1),hasMugshotBoard=!0}}),mp.events.add("HideMugshotBoard",()=>{null!=scriptHandles.boardHandle&&scriptHandles.boardHandle.destroy(),null!=scriptHandles.textHandle&&scriptHandles.textHandle.destroy(),null!=scriptHandles.scaleformHandle&&mp.game.graphics.setScaleformMovieAsNoLongerNeeded(scriptHandles.scaleformHandle),null!=scriptHandles.renderTargetID&&mp.game.ui.releaseNamedRendertarget(mp.game.joaat(scriptConst.renderTargetName)),scriptHandles.boardHandle=null,scriptHandles.textHandle=null,scriptHandles.scaleformHandle=null,scriptHandles.renderTargetID=null,mp.players.local.stopAnimTask(scriptConst.animDictionary,scriptConst.animName,-4),mp.game.streaming.hasAnimDictLoaded(scriptConst.animDictionary)&&mp.game.streaming.removeAnimDict(scriptConst.animDictionary),hasMugshotBoard=!1}),mp.events.add("render",()=>{null!=scriptHandles.scaleformHandle&&null!=scriptHandles.renderTargetID&&(mp.game.ui.setTextRenderId(scriptHandles.renderTargetID),mp.game.graphics.drawScaleformMovie(scriptHandles.scaleformHandle,.405,.37,.81,.74,255,255,255,255,0),mp.game.ui.setTextRenderId(1))});

},{}],16:[function(require,module,exports){
mp.Vector3.prototype.findRot=function(t,i,s){var h=(t+s)*(Math.PI/180);return this.x=this.x+i*Math.cos(h),this.y=this.y+i*Math.sin(h),this},mp.Vector3.prototype.normalize=function(t){return this.x=this.x/t,this.y=this.y/t,this.z=this.z/t,this},mp.Vector3.prototype.multiply=function(t){return this.x=this.x*t,this.y=this.y*t,this.z=this.z*t,this},mp.Vector3.prototype.dist=function(t){let i=this.x-t.x,s=this.y-t.y,h=this.z-t.z;return Math.sqrt(i*i+s*s+h*h)},mp.Vector3.prototype.getOffset=function(t){return this.x=this.x-t.x,this.y=this.y-t.y,this.z=this.z-t.z,new mp.Vector3(x,y,z)},mp.Vector3.prototype.ground=function(){return this.z=mp.game.gameplay.getGroundZFor3dCoord(this.x,this.y,this.z,0,!1),this};

},{}],17:[function(require,module,exports){
module.exports=new class{constructor(){this._setup()}_setup(e){this.screenFX="DeathFailMPIn",this.textDelay=750,this.camEffect=1}show(e){mp.game.audio.playSoundFrontend(-1,"Bed","WastedSounds",!0),mp.game.graphics.startScreenEffect(this.screenFX,0,!0),mp.game.cam.setCamEffect(this.camEffect),mp.game.ui.messages.showShard("~r~Wasted",e,1,0,2e3)}hide(){mp.game.graphics.stopScreenEffect(this.screenFX),mp.game.cam.setCamEffect(0)}};

},{}]},{},[7]);