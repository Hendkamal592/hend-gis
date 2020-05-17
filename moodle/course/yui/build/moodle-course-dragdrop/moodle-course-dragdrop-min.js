YUI.add("moodle-course-dragdrop",function(e,t){var n={ACTIONAREA:".actions",ACTIVITY:"activity",ACTIVITYINSTANCE:"activityinstance",CONTENT:"content",COURSECONTENT:"course-content",EDITINGMOVE:"editing_move",ICONCLASS:"iconsmall",JUMPMENU:"jumpmenu",LEFT:"left",LIGHTBOX:"lightbox",MOVEDOWN:"movedown",MOVEUP:"moveup",PAGECONTENT:"page-content",RIGHT:"right",SECTION:"section",SECTIONADDMENUS:"section_add_menus",SECTIONHANDLE:"section-handle",SUMMARY:"summary",SECTIONDRAGGABLE:"sectiondraggable"};M.course=M.course||{};var r=function(){r.superclass.constructor.apply(this,arguments)};e.extend(r,M.core.dragdrop,{sectionlistselector:null,initializer:function(){this.groups=[n.SECTIONDRAGGABLE],this.samenodeclass=M.course.format.get_sectionwrapperclass(),this.parentnodeclass=M.course.format.get_containerclass(),this.detectkeyboarddirection=!0;if(e.Node.one("."+n.JUMPMENU))return!1;this.sectionlistselector=M.course.format.get_section_wrapper(e);if(this.sectionlistselector){this.sectionlistselector="."+n.COURSECONTENT+" "+this.sectionlistselector,this.setup_for_section(this.sectionlistselector);var t=new e.DD.Delegate({container:"."+n.COURSECONTENT,nodes:"."+n.SECTIONDRAGGABLE,target:!0,handles:["."+n.LEFT],dragConfig:{groups:this.groups}});t.dd.plug(e.Plugin.DDProxy,{moveOnEnd:!1}),t.dd.plug(e.Plugin.DDConstrained,{constrain:"#"+n.PAGECONTENT,stickY:!0}),t.dd.plug(e.Plugin.DDWinScroll)}},setup_for_section:function(t){e.Node.all(t).each(function(t){var r=e.Moodle.core_course.util.section.getId(t);if(r>0){var i=t.one("."+n.RIGHT+" a."+n.MOVEDOWN),s=t.one("."+n.RIGHT+" a."+n.MOVEUP),o=M.util.get_string("movesection","moodle",r),u=t.one("."+n.LEFT);if((i||s)&&u){u.setStyle("cursor","move"),u.appendChild(this.get_drag_handle(o,n.SECTIONHANDLE,"icon",!0)),s&&(s.previous("br")?s.previous("br").remove():s.next("br")&&s.next("br").remove(),s.ancestor(".section_action_menu")&&s.ancestor().get("nodeName").toLowerCase()=="li"?s.ancestor().remove():s.remove());if(i){i.previous("br")?i.previous("br").remove():i.next("br")&&i.next("br").remove();var a=i.ancestor().get("nodeName").toLowerCase();i.ancestor(".section_action_menu")&&a=="li"?i.ancestor().remove():i.remove()}t.addClass(n.SECTIONDRAGGABLE)}}},this)},drag_start:function(t){var r=t.target,i=r.get("node"),s=r.get("dragNode");if(i===s)return;var o=e.Node.create("<"+M.course.format.get_containernode()+"></"+M.course.format.get_containernode()+">");o.addClass(M.course.format.get_containerclass());var u=e.Node.create("<"+M.course.format.get_sectionwrappernode()+"></"+M.course.format.get_sectionwrappernode()+">");u.addClass(M.course.format.get_sectionwrapperclass()),u.setStyle("margin",0),u.setContent(i.get("innerHTML")),o.appendChild(u),s.setContent(o),s.addClass(n.COURSECONTENT)},drag_dropmiss:function(e){this.drop_hit(e)},get_section_index:function(t){var r="."+n.COURSECONTENT+" "+M.course.format.get_section_selector(e),i=e.all(r),s=i.indexOf(t),o=i.indexOf(e.one("#section-0"));return s-o},drop_hit:function(t){var r=t.drag,i=r.get("node"),s=e.Moodle.core_course.util.section.getId(i),o=s,u=this.get_section_index(i),a=u;if(s===u)return;o>a&&(o=u,a=s),r.get("dragNode").removeClass(n.COURSECONTENT);var f=e.Node.all(this.sectionlistselector),l=M.util.add_lightbox(e,i),c={},h=this.get("config").pageparams,p;for(p in h){if(!h.hasOwnProperty(p))continue;c[p]=h[p]}c.sesskey=M.cfg.sesskey,c.courseId=this.get("courseid"),c["class"]="section",c.field="move",c.id=s,c.value=u;var d=M.cfg.wwwroot+this.get("ajaxurl");e.io(d,{method:"POST",data:c,on:{start:function(){l.show()},success:function(t,n){try{var r=e.JSON.parse(n.responseText);r.error&&new M.core.ajaxException(r),M.course.format.process_sections(e,f,r,o,a)}catch(i){}var s,u=!1;do{u=!1;for(s=o;s<=a;s++)if(e.Moodle.core_course.util.section.getId(f.item(s-1))>e.Moodle.core_course.util.section.getId(f.item(s))){var c=f.item(s-1).get("id");f.item(s-1).set("id",f.item(s).get("id")),f.item(s).set("id",c),M.course.format.swap_sections(e,s-1,s),u=!0}a-=1}while(u);window.setTimeout(function(){l.hide()},250)},failure:function(e,t){this.ajax_failure(t),l.hide()}},context:this})}},{NAME:"course-dragdrop-section",ATTRS:{courseid:{value:null},ajaxurl:{value:0},config:{value:0}}}),M.course=M.course||{},M.course.init_section_dragdrop=function(e){new r(e)};var i=function(){i.superclass.constructor.apply(this,arguments)};e.extend(i,M.core.dragdrop,{initializer:function(){this.groups=["resource"],this.samenodeclass=n.ACTIVITY,this.parentnodeclass=n.SECTION,this.samenodelabel={identifier:"afterresource",component:"moodle"},this.parentnodelabel={identifier:"totopofsection",component:"moodle"};var t=M.course.format.get_section_selector(e);if(t){t="."+n.COURSECONTENT+" "+t,this.setup_for_section(t);var r=t.slice(n.COURSECONTENT.length+2)+" li."+n.ACTIVITY,i=new e.DD.Delegate({container:"."+n.COURSECONTENT,nodes:r,target:!0,handles:["."+n.EDITINGMOVE],dragConfig:{groups:this.groups}});i.dd.plug(e.Plugin.DDProxy,{moveOnEnd:!1,cloneNode:!0}),i.dd.plug(e.Plugin.DDConstrained,{constrain:"#"+n.PAGECONTENT}),i.dd.plug(e.Plugin.DDWinScroll),M.course.coursebase.register_module(this),M.course.dragres=this}},setup_for_section:function(t){e.Node.all(t).each(function(t){var r=t.one("."+n.CONTENT+" ul."+n.SECTION);r||(r=e.Node.create("<ul></ul>"),r.addClass(n.SECTION),t.one("."+n.CONTENT+" div."+n.SUMMARY).insert(r,"after")),r.setAttribute("data-draggroups",this.groups.join(" ")),new e.DD.Drop({node:r,groups:this.groups,padding:"20 0 20 0"}),this.setup_for_resource("#"+t.get("id")+" li."+n.ACTIVITY)},this)},setup_for_resource:function(t){e.Node.all(t).each(function(t){var r=t.getData("draggroups");r||(t.setAttribute("data-draggroups",this.groups.join(" ")),new e.DD.Drop({node:t,groups:this.groups,padding:"20 0 20 0"}));var i=t.one("a."+n.EDITINGMOVE);if(i){var s=i.getData("sectionreturn");i.replace(this.get_drag_handle(M.util.get_string("movecoursemodule","moodle"),n.EDITINGMOVE,n.ICONCLASS,!0).setAttribute("data-sectionreturn",s))}},this)},drag_start:
function(e){var t=e.target;if(t.get("dragNode")===t.get("node"))return;t.get("dragNode").setContent(t.get("node").get("innerHTML")),t.get("dragNode").all("img.iconsmall").setStyle("vertical-align","baseline")},drag_dropmiss:function(e){this.drop_hit(e)},drop_hit:function(t){var r=t.drag,i=r.get("node"),s=t.drop.get("node"),o=i.one(n.ACTIONAREA),u=M.util.add_spinner(e,o),a={},f=this.get("config").pageparams,l;for(l in f)a[l]=f[l];a.sesskey=M.cfg.sesskey,a.courseId=this.get("courseid"),a["class"]="resource",a.field="move",a.id=Number(e.Moodle.core_course.util.cm.getId(i)),a.sectionId=e.Moodle.core_course.util.section.getId(s.ancestor(M.course.format.get_section_wrapper(e),!0)),i.next()&&(a.beforeId=Number(e.Moodle.core_course.util.cm.getId(i.next())));var c=M.cfg.wwwroot+this.get("ajaxurl");e.io(c,{method:"POST",data:a,on:{start:function(){this.lock_drag_handle(r,n.EDITINGMOVE),u.show()},success:function(t,s){var o=e.JSON.parse(s.responseText),a={element:i,visible:o.visible};M.course.coursebase.invoke_function("set_visibility_resource_ui",a),this.unlock_drag_handle(r,n.EDITINGMOVE),window.setTimeout(function(){u.hide()},250)},failure:function(e,t){this.ajax_failure(t),this.unlock_drag_handle(r,n.SECTIONHANDLE),u.hide()}},context:this})}},{NAME:"course-dragdrop-resource",ATTRS:{courseid:{value:null},ajaxurl:{value:0},config:{value:0}}}),M.course=M.course||{},M.course.init_resource_dragdrop=function(e){new i(e)}},"@VERSION@",{requires:["base","node","io","dom","dd","dd-scroll","moodle-core-dragdrop","moodle-core-notification","moodle-course-coursebase","moodle-course-util"]});
