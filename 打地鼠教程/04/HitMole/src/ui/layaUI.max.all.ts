
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class GameUI extends View {
		public timeBar:Laya.ProgressBar;
		public scoreNums:Laya.Box;

        public static  uiView:any ={"type":"View","child":[{"props":{"x":25,"y":25,"skin":"ui/back.png"},"type":"Image"},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-01.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":158,"y":193,"name":"item0"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-02.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":345,"y":191,"name":"item1"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-03.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":540,"y":196,"name":"item2"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-04.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":126,"y":282,"name":"item3"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-05.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":344,"y":285,"name":"item4"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-06.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":546,"y":284,"name":"item5"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-07.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":122,"y":382,"name":"item6"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-08.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":346,"y":388,"name":"item7"}},{"type":"Box","child":[{"props":{"x":7,"skin":"ui/mouse_normal_1.png","y":3,"name":"normal"},"type":"Image"},{"props":{"x":6,"y":17,"skin":"ui/mouse_hit_1.png","name":"hit"},"type":"Image"},{"props":{"y":84,"skin":"ui/mask-09.png"},"type":"Image"},{"props":{"x":60,"y":23,"skin":"ui/score_2.png","width":86,"height":30,"anchorX":0.5,"anchorY":0.5,"name":"scoreImg"},"type":"Image"}],"props":{"x":566,"y":388,"name":"item8"}},{"props":{"x":14,"y":14,"skin":"ui/progress_time.png","var":"timeBar","value":1},"type":"ProgressBar"},{"type":"Box","child":[{"props":{"skin":"ui/clip_number.png","clipX":10,"name":"item0"},"type":"Clip"},{"props":{"x":18,"skin":"ui/clip_number.png","clipX":10,"name":"item1"},"type":"Clip"},{"props":{"x":36,"skin":"ui/clip_number.png","clipX":10,"name":"item2"},"type":"Clip"},{"props":{"x":54,"skin":"ui/clip_number.png","clipX":10,"name":"item3"},"type":"Clip"},{"props":{"x":72,"skin":"ui/clip_number.png","clipX":10,"name":"item4"},"type":"Clip"},{"props":{"x":90,"skin":"ui/clip_number.png","clipX":10,"name":"item5"},"type":"Clip"},{"props":{"x":108,"skin":"ui/clip_number.png","clipX":10,"name":"item6"},"type":"Clip"},{"props":{"x":126,"skin":"ui/clip_number.png","clipX":10,"name":"item7"},"type":"Clip"},{"props":{"x":144,"skin":"ui/clip_number.png","clipX":10,"name":"item8"},"type":"Clip"},{"props":{"x":162,"skin":"ui/clip_number.png","clipX":10,"name":"item9"},"type":"Clip"}],"props":{"x":24,"y":48,"var":"scoreNums"}}],"props":{"width":800,"height":600}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameUI.uiView);

        }

    }
}

module ui {
    export class GameOverUI extends View {
		public restartBtn:Laya.Button;
		public scoreNums:Laya.Box;

        public static  uiView:any ={"type":"View","child":[{"props":{"skin":"ui/overBg.png","width":500,"height":400,"sizeGrid":"22,22,21,23"},"type":"Image"},{"props":{"x":19,"y":37,"skin":"ui/total Score.png"},"type":"Image"},{"props":{"x":161,"y":277,"skin":"ui/btn_restart.png","stateNum":2,"var":"restartBtn"},"type":"Button"},{"type":"Box","child":[{"props":{"skin":"ui/clip_number.png","clipX":10,"name":"item0"},"type":"Clip"},{"props":{"x":18,"skin":"ui/clip_number.png","clipX":10,"name":"item1"},"type":"Clip"},{"props":{"x":36,"skin":"ui/clip_number.png","clipX":10,"name":"item2"},"type":"Clip"},{"props":{"x":54,"skin":"ui/clip_number.png","clipX":10,"name":"item3"},"type":"Clip"},{"props":{"x":72,"skin":"ui/clip_number.png","clipX":10,"name":"item4"},"type":"Clip"},{"props":{"x":90,"skin":"ui/clip_number.png","clipX":10,"name":"item5"},"type":"Clip"},{"props":{"x":108,"skin":"ui/clip_number.png","clipX":10,"name":"item6"},"type":"Clip"},{"props":{"x":126,"skin":"ui/clip_number.png","clipX":10,"name":"item7"},"type":"Clip"},{"props":{"x":144,"skin":"ui/clip_number.png","clipX":10,"name":"item8"},"type":"Clip"},{"props":{"x":162,"skin":"ui/clip_number.png","clipX":10,"name":"item9"},"type":"Clip"}],"props":{"x":160,"y":169,"var":"scoreNums"}}],"props":{"width":500,"height":400}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameOverUI.uiView);

        }

    }
}

module ui {
    export class GameStartUI extends View {
		public startBtn:Laya.Button;
		public 123:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":55.5,"x":38.5,"skin":"ui/help.png"}},{"type":"Button","props":{"y":430,"x":291,"var":"startBtn","stateNum":2,"skin":"ui/btn_start.png"}},{"type":"Image","props":{"var":"123","skin":"ui/mask-02.png","name":"123"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameStartUI.uiView);

        }

    }
}

module ui {
    export class HammerUI extends View {
		public hit:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","child":[{"props":{"x":64,"y":60,"skin":"ui/hammer.png","width":98,"height":77,"pivotX":56,"pivotY":49,"rotation":20},"type":"Image","compId":2}],"props":{"width":100,"height":100},"animations":[{"id":1,"name":"hit","frameRate":24,"nodes":[{"target":2,"keyframes":{"x":[{"index":0,"value":64,"tween":true,"tweenMethod":"linearNone","key":"x","target":2},{"index":1,"value":62,"tween":true,"tweenMethod":"linearNone","key":"x","target":2},{"index":5,"value":64,"tween":true,"tweenMethod":"linearNone","key":"x","target":2}],"y":[{"index":0,"value":60,"tween":true,"tweenMethod":"linearNone","key":"y","target":2},{"index":1,"value":57,"tween":true,"tweenMethod":"linearNone","key":"y","target":2},{"index":5,"value":60,"tween":true,"tweenMethod":"linearNone","key":"y","target":2}],"rotation":[{"index":0,"value":20,"tween":true,"tweenMethod":"linearNone","key":"rotation","target":2},{"index":1,"value":-20,"tween":true,"tweenMethod":"linearNone","key":"rotation","target":2},{"index":5,"value":20,"tween":true,"tweenMethod":"linearNone","key":"rotation","target":2}]}}],"action":0}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.HammerUI.uiView);

        }

    }
}
