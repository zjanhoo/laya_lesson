/**
 * 扑克牌逻辑类
 */
var PokerPresenter = /** @class */ (function () {
    function PokerPresenter() {
        this.ER = 13; // 扑克牌2 ，所以value是
        this.mOutPokerState = 0;
        this.mOutPokerType = 0;
        this.KINGS = 5; // 大小王
        this.m_count = 0; // 计算飞机牌的个数
        this.mPokerList = new Array();
        this.mUsingPokerList = new Array();
        this.mPlayPokerList = new Array();
        this.mOwnPlayer = new Player("玩家");
        this.mAPlayer = new Player("NPC A");
        this.mBPlayer = new Player("NPC B");
        this.mOwnPlayPokerList = new Array();
        this.mFollowSuit = new Array();
        this.mOutPlayerPoker = new Array();
        this.mTempPlayPokerList = new Array();
    }
    PokerPresenter.prototype.resetValue = function () {
        this.mPlayPokerList = new Array();
        this.mOwnPlayer = new Player("玩家");
        this.mAPlayer = new Player("NPC A");
        this.mBPlayer = new Player("NPC B");
        this.mOwnPlayPokerList = new Array();
        this.mFollowSuit = new Array();
        this.mOutPlayerPoker = new Array();
        this.mTempPlayPokerList = new Array();
    };
    /**
    * 创建扑克牌
    */
    PokerPresenter.prototype.createPokerArr = function () {
        var num = 1;
        //创建52个除大鬼小鬼外的牌  
        for (var i = 0; i < 4; ++i) {
            for (var j = 0; j < 13; ++j) {
                var pokerObj = new Poker("poker/" + num + ".png", i, j + 1);
                this.mPokerList.push(pokerObj);
                num++;
            }
        }
        // 创建大小王
        var pokerObj1 = new Poker("poker/53.png", this.KINGS, 14); // 小王
        this.mPokerList.push(pokerObj1);
        var pokerObj2 = new Poker("poker/54.png", this.KINGS, 15); // 大王
        this.mPokerList.push(pokerObj2);
        this.mUsingPokerList = this.mPokerList;
    };
    /**
    * 发牌
    */
    PokerPresenter.prototype.licensing = function () {
        for (var i = 0; i < this.mUsingPokerList.length; i++) {
            if (i < 51) {
                if (i % 3 == 0) {
                    var pokerObj1 = this.mUsingPokerList[i];
                    this.mOwnPlayer.mHandPokerList.push(pokerObj1);
                }
                else if (i % 3 == 1) {
                    var pokerObj2 = this.mUsingPokerList[i];
                    this.mAPlayer.mHandPokerList.push(pokerObj2);
                }
                else if (i % 3 == 2) {
                    var pokerObj3 = this.mUsingPokerList[i];
                    this.mBPlayer.mHandPokerList.push(pokerObj3);
                }
                else {
                    console.log("licensing error ! i%3=" + i % 3);
                }
            }
            else if (i > 50 && i < 54) {
                //mUsingPokerList 
            }
        }
        // 分析电脑玩家的牌型
        this.playerOutPokerType(this.mAPlayer.mHandPokerList);
        this.playerOutPokerType(this.mBPlayer.mHandPokerList);
        this.splitNPCHandPoker(this.mAPlayer.mHandPokerList, this.mAPlayer);
        this.splitNPCHandPoker(this.mBPlayer.mHandPokerList, this.mBPlayer);
        this.testShowHandPoker("自己的牌", this.mOwnPlayer.mHandPokerList);
        this.testShowHandPoker("玩家A的牌", this.mAPlayer.mHandPokerList);
        this.testShowHandPoker("玩家B的牌", this.mBPlayer.mHandPokerList);
    };
    PokerPresenter.prototype.testShowHandPoker = function (name, parm) {
        var str = "";
        for (var i = 0; i < parm.length; i++) {
            str = str + " " + (parm[i].getStringValue());
        }
        console.log(name + " " + str);
    };
    /**UI上展示玩家自己的手牌 */
    PokerPresenter.prototype.showPoker = function () {
        for (var index = 0; index < this.mOwnPlayer.mHandPokerList.length; index++) {
            //创建Image实例
            var img = this.mOwnPlayer.mHandPokerList[index].img;
            //设置皮肤（取图集中小图的方式就是 原小图目录名/原小图资源名.png）
            img.skin = this.mOwnPlayer.mHandPokerList[index].pokerPic;
            img.pos(450 + index * 35, 500);
            //添加到舞台上显示
            Laya.stage.addChild(img);
        }
    };
    /** 发地主牌 */
    PokerPresenter.prototype.sendLandlordPokers = function (parm) {
        for (var index = 51; index < this.mUsingPokerList.length; index++) {
            var element = this.mUsingPokerList[index];
            parm.push(element);
        }
    };
    /** 给所有玩家排序 */
    PokerPresenter.prototype.sortAllPlayerPoker = function () {
        // 排序
        Utils.sortPokerList(this.mOwnPlayer.mHandPokerList);
        Utils.sortPokerList(this.mAPlayer.mHandPokerList);
        Utils.sortPokerList(this.mBPlayer.mHandPokerList);
    };
    /**
     * 添加出牌集合
     */
    PokerPresenter.prototype.addPlayList = function (parmList) {
        this.mPlayPokerList = new Array();
        var paramSize = parmList.length;
        var tempPokerList = new Array();
        for (var i = 0; i < paramSize; i++) {
            var temp = parmList[i];
            if (temp.isSelect) {
                // 添加到出牌集合中
                this.mPlayPokerList.push(temp);
                // 删除舞台view
                temp.img.removeSelf();
            }
            else {
                tempPokerList.push(temp);
            }
        }
        this.mOwnPlayer.mHandPokerList = new Array();
        this.mOwnPlayer.mHandPokerList = tempPokerList;
    };
    /**
     * 展示出牌效果
     */
    PokerPresenter.prototype.showPlayPoker = function (parmList) {
        for (var index = 0; index < parmList.length; index++) {
            var img = parmList[index].img;
            img.skin = parmList[index].pokerPic;
            img.pos(450 + index * 35, 200);
            Laya.stage.addChild(img);
        }
    };
    /**
     * 展示出牌效果
     */
    PokerPresenter.prototype.showPlayPokerByPlayerType = function (npc, parmList) {
        var x = 0;
        var y = 0;
        var indexVaule = 0;
        if (npc.name == this.mOwnPlayer.name) {
            y = 200;
            x = 650 + indexVaule * 35;
        }
        else if (npc.name == this.mAPlayer.name) {
            y = 100;
            x = 850 + indexVaule * 35;
        }
        else {
            y = 100;
            x = 450 + indexVaule * 35;
        }
        for (var index = 0; index < parmList.length; index++) {
            indexVaule = index;
            var img = parmList[index].img;
            img.skin = parmList[index].pokerPic;
            img.pos(this.uiX(x, index), y);
            Laya.stage.addChild(img);
        }
    };
    PokerPresenter.prototype.uiX = function (x, index) {
        return (x + index * 35);
    };
    PokerPresenter.prototype.testLog = function () {
        var String = "";
        for (var i = 0; i < this.mPlayPokerList.length; i++) {
            String += " " + this.mPlayPokerList[i].pokerValue;
        }
        console.log("模型判断错误：" + String);
    };
    /**
     * 对出的牌进行分类排序( 判定是否合法 )
     * @param parmOutPokerArray 要出的牌集合
     */
    PokerPresenter.prototype.paiDuanPokerType = function () {
        // 对出的牌进行排序  
        this.playerOutPokerType(this.mPlayPokerList);
        Utils.sortPlayPokerList(this.mPlayPokerList);
        // 牌型判断 
        var countlength = this.mPlayPokerList.length;
        // 牌的张数少于5张类型判断 单，对，三张，四张  
        if (countlength < 5 && countlength > 0) {
            var pokerObj1 = this.mPlayPokerList[0];
            var pokerObj2 = this.mPlayPokerList[countlength - 1];
            if (pokerObj1.pokerValue == pokerObj2.pokerValue) {
                return countlength;
            }
            pokerObj2 = this.mPlayPokerList[countlength - 2];
            if (pokerObj1.pokerValue == pokerObj2.pokerValue && length == 4) {
                return PokerCardType.THREE_ONE_CARD;
            }
            if (pokerObj1.pokerType == this.KINGS && pokerObj2.pokerType == this.KINGS) {
                return PokerCardType.BOMB_CARD;
            }
        }
        // 牌的张数大于等于5张的类型判断  
        if (countlength >= 5) {
            if (this.verificationConConnectCard(this.mPlayPokerList)) {
                return PokerCardType.CONNECT_CARD;
            }
            if (this.verificationCompanyCard(this.mPlayPokerList)) {
                return PokerCardType.COMPANY_CARD;
            }
            return this.verificationAircraft(this.mPlayPokerList); // 是否为飞机
        }
        this.testLog();
        return PokerCardType.ERROR_CARD;
    };
    /**
     * 对出的牌进行排序 (方便分析牌型)
     * @param parmOutPokerArray 要出的牌集合
     */
    PokerPresenter.prototype.playerOutPokerType = function (parmOutPokerArray) {
        var countNumArray = new Array();
        while (parmOutPokerArray.length > 0) {
            var countNumObj = new CountNum();
            //  取出第一个
            var pokerObj1 = parmOutPokerArray[0];
            // 从数组中删除这个对象
            parmOutPokerArray = Utils.removeArray(parmOutPokerArray, pokerObj1);
            countNumObj.pokerNum = 1;
            countNumObj.pokerValue = pokerObj1.pokerValue;
            countNumObj.pokerArray.push(pokerObj1);
            var i = 0;
            while (i < parmOutPokerArray.length) {
                var pokerObj2 = parmOutPokerArray[i++];
                if (pokerObj2.pokerValue == pokerObj2.pokerValue) {
                    ++countNumObj.pokerNum;
                    countNumObj.pokerArray.push(pokerObj2);
                    // 从数组中删除这个对象
                    parmOutPokerArray = Utils.removeArray(parmOutPokerArray, pokerObj2);
                }
            }
            // 把对象存储在计数数组中
            countNumArray.push(countNumObj);
        }
        // 将计数数组 通过牌值 从小到大排序
        for (var i = 0; i < countNumArray.length - 1 && countNumArray.length > 0; i++) {
            for (var j = 0; j < countNumArray.length - 1 - i; j++) {
                if (countNumArray[j].pokerValue > countNumArray[j + 1].pokerValue) {
                    var countNumObjTemp = countNumArray[j];
                    countNumArray[j] = countNumArray[j + 1];
                    countNumArray[j + 1] = countNumObjTemp;
                }
            }
        }
        // stable_sort(vec.begin(),vec.end(),isShorter);//按牌的数量从小到大再排一次  
        for (var i = 0; i < countNumArray.length; i++) {
            for (var j = 0; j < countNumArray[i].pokerArray.length; j++) {
                parmOutPokerArray.push(countNumArray[i].pokerArray[j]);
            }
        }
    };
    /**
     * 判断五张牌以上 是否为飞机
     * @param parm 要出的牌集合
     */
    PokerPresenter.prototype.verificationAircraft = function (parm) {
        var length = parm.length;
        var card_index = this.aircraft(parm); //分析牌是否是飞机 
        //判断三带二  
        if (card_index.three_index.length * 3 + card_index.duble_index.length * 2 == length && card_index.three_index.length == 1 && card_index.duble_index.length == 1)
            return PokerCardType.THREE_TWO_CARD;
        //判断飞机  
        if (card_index.three_index.length > 1 && card_index.four_index.length == 0 && this.isFeiJiLian(card_index.three_index)) {
            //飞机不带  
            if (card_index.three_index.length * 3 == length && card_index.duble_index.length + card_index.single_index.length == 0)
                return PokerCardType.AIRCRAFT_CARD;
            //飞机带单  
            if (card_index.three_index.length * 3 + card_index.single_index.length == length && card_index.duble_index.length == 0)
                return PokerCardType.AIRCRAFT_SINGLE_CARD;
            //飞机带双  
            if (card_index.three_index.length * 3 + card_index.duble_index.length * 2 == length && card_index.single_index.length == 0)
                return PokerCardType.AIRCRAFT_DOBULE_CARD;
        }
        //判断四带  
        if (card_index.three_index.length == 0 && card_index.four_index.length != 0 && length % 2 == 0) {
            //四带单  
            if (card_index.four_index.length * 4 + card_index.single_index.length == length && card_index.four_index.length == 1 && card_index.single_index.length == 2)
                return PokerCardType.BOMB_TWO_CARD;
            //四带对  
            if (card_index.four_index.length * 4 + card_index.duble_index.length * 2 == length && card_index.four_index.length == 1 && card_index.duble_index.length == 1)
                return PokerCardType.BOMB_TWOOO_CARD;
        }
        return PokerCardType.ERROR_CARD;
    };
    /**
     * 是否为飞机
     * @param parm 要出的牌集合
     */
    PokerPresenter.prototype.isFeiJiLian = function (parm) {
        for (var i = 0; i < parm.length; ++i) {
            if (parm[i] + 1 != parm[i + 1] || parm[i + 1] >= 14)
                return false;
        }
        return true;
    };
    /**
     * 分析飞机牌结构
     * @param parm 要出的牌集合
     */
    PokerPresenter.prototype.aircraft = function (parm) {
        var aircraftTypeObj = new AircraftType();
        var length = parm.length;
        for (var i = 0; i < length;) {
            var count = 0; //相同牌的个数
            var tempObj1 = parm[i];
            //找出相同牌
            for (var j = i; j < length; j++) {
                var tempObj2 = parm[j];
                if (tempObj1.pokerValue == tempObj2.pokerValue) {
                    ++count;
                    ++i;
                }
            }
            if (count == 1) {
                aircraftTypeObj.single_index.push(tempObj1.pokerValue);
            }
            else if (count == 2) {
                aircraftTypeObj.duble_index.push(tempObj1.pokerValue);
            }
            else if (count == 3) {
                aircraftTypeObj.three_index.push(tempObj1.pokerValue);
            }
            else if (count == 4) {
                aircraftTypeObj.four_index.push(tempObj1.pokerValue);
            }
            else {
                console.log("aircraft 找出相同牌 count 大于4  count:" + count);
            }
        }
        return aircraftTypeObj;
    };
    /**
     * 判断五张牌以上是否为连对
     * @param parm 要出的牌集合
     */
    PokerPresenter.prototype.verificationCompanyCard = function (parm) {
        var length = parm.length;
        if (length >= 6 && length % 2 != 0) {
            return false;
        }
        for (var i = 0; i < parm.length - 2; i += 2) {
            var tempObj1 = parm[i];
            var tempObj2 = parm[i + 2];
            if (tempObj1.pokerValue + 1 != tempObj2.pokerValue) {
                return false;
            }
        }
        return true;
    };
    /**
     * 判断五张牌以上 是否为连牌
     * @param parm 要出的牌集合
     */
    PokerPresenter.prototype.verificationConConnectCard = function (parm) {
        var length = parm.length;
        var tempObj1 = parm[length - 1];
        if (tempObj1.pokerValue >= 14) {
            return false;
        }
        for (var i = 0; i < parm.length - 1; i++) {
            var tempObj1 = parm[i];
            var tempObj2 = parm[i + 1];
            if (tempObj1.pokerValue + 1 != tempObj2.pokerValue) {
                return false;
            }
        }
        return true;
    };
    /**
    * 拆分NPC玩家手中的牌 区分类型
    * @param parm 要拆分的牌集合
    * @param npcPlayer 玩家对象
    */
    PokerPresenter.prototype.splitNPCHandPoker = function (parm, npcPlayer) {
        // 先分析炸弹－－－飞机－－－连对－－－连牌－－三带，对子，单张
        // 首先分析出来牌的类型（如：四张，三张，两张，一张）   
        var pokerHandTypeList = new Array();
        var pokerHandTypeObj = new PokerHandType();
        var tempArray = new Array(); // 临时数组
        tempArray = parm;
        // 收集大小王 (因为手牌根据从大到小排序了,所以如果有大小王，取前两个就能判断出)
        var tempObj1 = tempArray[0];
        var tempObj2 = tempArray[1];
        if (tempObj1.pokerType == this.KINGS && tempObj2.pokerType == this.KINGS) {
            pokerHandTypeObj.pokerType = PokerCardType.BOMB_CARD;
            pokerHandTypeObj.pokerArray.push(tempObj1);
            pokerHandTypeObj.pokerArray.push(tempObj2);
            tempArray = Utils.removeArray(tempArray, tempObj1);
            tempArray = Utils.removeArray(tempArray, tempObj2);
            pokerHandTypeList.push(pokerHandTypeObj);
        }
        //分析牌型 
        for (var i = 0; i < parm.length;) {
            pokerHandTypeObj = new PokerHandType();
            var tempObj1 = tempArray[i];
            for (var j = i; j < parm.length; j++) {
                var tempObj2 = tempArray[j];
                if (tempObj1.pokerValue == tempObj2.pokerValue) {
                    i++;
                    pokerHandTypeObj.pokerArray.push(tempObj2);
                }
                else {
                    break;
                }
            }
            if (pokerHandTypeObj.pokerArray.length == 4) {
                pokerHandTypeObj.pokerType = PokerCardType.BOMB_CARD;
            }
            if (pokerHandTypeObj.pokerArray.length == 3) {
                pokerHandTypeObj.pokerType = PokerCardType.THREE_CARD;
            }
            if (pokerHandTypeObj.pokerArray.length == 2) {
                pokerHandTypeObj.pokerType = PokerCardType.DOUBLE_CARD;
            }
            if (pokerHandTypeObj.pokerArray.length == 1) {
                pokerHandTypeObj.pokerType = PokerCardType.SINGLE_CARD;
            }
            pokerHandTypeList.push(pokerHandTypeObj);
        }
        // 提取炸弹
        for (var i = 0; i < pokerHandTypeList.length; i++) {
            if (pokerHandTypeList[i].pokerType == PokerCardType.BOMB_CARD) {
                pokerHandTypeObj = new PokerHandType();
                pokerHandTypeObj.pokerType = PokerCardType.BOMB_CARD;
                pokerHandTypeObj.pokerArray = pokerHandTypeList[i].pokerArray;
                npcPlayer.pokerHandTypeList.push(pokerHandTypeObj);
                //  iter = vec.erase(iter);   源码使用迭代器擦出erase函数，删除迭代器指向元元素后，还能返回下一个。
            }
        }
        // pokerHandTypeList处理删除已经提取过的炸弹
        Utils.removeArrayByPokerHandType(pokerHandTypeList, PokerCardType.BOMB_CARD);
        // 提取飞机
        this.extractAircraft(npcPlayer, PokerCardType.THREE_CARD, pokerHandTypeList);
        // 提取连对
        this.extractContinuityPair(npcPlayer, pokerHandTypeList);
        // 提取连牌
        this.extractContinuityPorker(npcPlayer, pokerHandTypeList);
        //剩余的是三带,对子,单张 全部加入npc牌型中 
        for (var i = 0; i < pokerHandTypeList.length; i++) {
            npcPlayer.pokerHandTypeList.push(pokerHandTypeList[i]);
        }
        // 稳定排序 最后按每个牌型的值从小到大进行排序。
        // xxx
        Utils.sorPokerHandTypeList(npcPlayer.pokerHandTypeList);
    };
    /**
    * 提取飞机
    * @param npcPlayer 玩家对象
    * @param card_type 牌型
    * @param pokerHandTypeList 牌型集合
    */
    PokerPresenter.prototype.extractAircraft = function (npcPlayer, card_type, pokerHandTypeList) {
        var pokerObj1 = null;
        var pokerHandTypeObj1 = new PokerHandType;
        var length = pokerHandTypeList.length;
        for (var i = 0; i < length;) {
            if (pokerObj1 == null && i + 1 == pokerHandTypeList.length) {
                break;
            }
            if (pokerObj1 == null && pokerHandTypeList[i].pokerType == card_type && pokerHandTypeList[i + 1].pokerType == card_type) {
                var tempObj1 = pokerHandTypeList[i].pokerArray[0];
                var tempObj2 = pokerHandTypeList[i + 1].pokerArray[0];
                console.log("提取飞机 tempObj1.pokerValue-1:" + (tempObj1.pokerValue - 1) + " tempObj2.pokerValue:" + tempObj2.pokerValue);
                if (tempObj1.pokerValue - 1 == tempObj2.pokerValue) {
                    pokerObj1 = tempObj2;
                    pokerHandTypeObj1.pokerType = PokerCardType.AIRCRAFT_CARD;
                    pokerHandTypeObj1.pokerArray = pokerHandTypeList[i].pokerArray;
                    //  iter = vec.erase(iter); 
                    length = Utils.removeArrayByAny(pokerHandTypeList, i);
                    i++;
                    pokerHandTypeObj1.pokerArray = pokerHandTypeObj1.pokerArray.concat(pokerHandTypeList[i].pokerArray);
                    length = Utils.removeArrayByAny(pokerHandTypeList, i);
                    i++;
                }
            }
            if (pokerObj1 != null) {
                if (i == length) {
                    npcPlayer.pokerHandTypeList.push(pokerHandTypeObj1);
                    break;
                }
                var tempObj1 = pokerHandTypeList[i].pokerArray[0];
                if (pokerHandTypeList[i].pokerType == card_type && pokerObj1.pokerValue - 1 == tempObj1.pokerValue) {
                    pokerObj1 = tempObj1;
                    pokerHandTypeObj1.pokerArray = pokerHandTypeObj1.pokerArray.concat(pokerHandTypeList[i].pokerArray);
                    length = Utils.removeArrayByAny(pokerHandTypeList, i);
                    i++;
                    if (i == length) {
                        npcPlayer.pokerHandTypeList.push(pokerHandTypeObj1);
                        break;
                    }
                }
                else {
                    npcPlayer.pokerHandTypeList.push(pokerHandTypeObj1);
                    pokerObj1 = null;
                }
            }
            else {
                i++;
            }
        }
    };
    /**
    * 提取连对
    * @param npcPlayer 玩家对象
    * @param pokerHandTypeList 牌型集合
    */
    PokerPresenter.prototype.extractContinuityPair = function (npcPlayer, pokerHandTypeList) {
        var vecTem = new Array();
        var vecFan = new Array();
        var pokerObj = null;
        var length = pokerHandTypeList.length;
        for (var i = 0; i < length;) {
            //将相连的牌加入临时数组中 
            var pokerObj1 = pokerHandTypeList[i].pokerArray[0];
            if ((pokerHandTypeList[i].pokerType == PokerCardType.THREE_CARD || pokerHandTypeList[i].pokerType == PokerCardType.DOUBLE_CARD) && (pokerObj == null ||
                (pokerObj.pokerValue - 1 == pokerObj1.pokerValue && pokerObj.pokerValue < this.ER))) {
                pokerObj = pokerObj1;
                vecTem.push(pokerHandTypeList[i]);
                // iter = vec.erase(iter);
                i++;
            }
            else {
                if (pokerObj == null) {
                    i++;
                }
                pokerObj = null;
                if (vecTem.length >= 3) {
                    var xing = new PokerHandType();
                    xing.pokerType = PokerCardType.COMPANY_CARD;
                    for (var i = 0; i < vecTem.length; i++) {
                        if (vecTem[i].pokerType == PokerCardType.THREE_CARD) {
                            //将多余的一张保存返回数组vecFan中  
                            var xing1 = new PokerHandType();
                            xing1.pokerType = PokerCardType.SINGLE_CARD;
                            xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                            vecTem[i].pokerArray.pop();
                            vecFan.push(xing1);
                            //将剩余两张保存xing中  
                            xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                        }
                        if (vecTem[i].pokerType == PokerCardType.DOUBLE_CARD) {
                            xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                        }
                    }
                    vecTem = new Array();
                    npcPlayer.pokerHandTypeList.push(xing);
                }
                else if (vecTem.length > 0) {
                    vecFan = vecFan.concat(vecTem);
                    vecTem = new Array();
                }
            }
        }
        if (vecTem.length > 0) {
            if (vecTem.length >= 3) {
                var xing = new PokerHandType();
                xing.pokerType = PokerCardType.COMPANY_CARD;
                for (var i = 0; i < vecTem.length; i++) {
                    if (vecTem[i].pokerType == PokerCardType.THREE_CARD) {
                        //将多余的一张保存返回数组vecFan中  
                        var xing1 = new PokerHandType();
                        xing1.pokerType = PokerCardType.SINGLE_CARD;
                        xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                        //将剩余两张保存xing中  
                        xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                    }
                    if (vecTem[i].pokerType == PokerCardType.DOUBLE_CARD) {
                        xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                    }
                }
                vecTem = new Array();
                npcPlayer.pokerHandTypeList.push(xing);
            }
            else if (vecTem.length > 0) {
                vecFan = vecFan.concat(vecTem);
                vecTem = new Array();
            }
        }
        //将vecFan返回到vec数组中并从大到小排序  
        if (vecFan.length > 0) {
            pokerHandTypeList = pokerHandTypeList.concat(vecFan);
            // 稳定排序 xxx
            //stable_sort(vec.begin(),vec.end(),isDaDaoXiao);  
        }
    };
    /**提取单牌 */
    PokerPresenter.prototype.extractSingle = function (npcPlayer, parm) {
        var pokerHandType = new PokerHandType();
        pokerHandType.pokerArray.push(parm);
        pokerHandType.pokerType = PokerCardType.SINGLE_CARD;
        npcPlayer.pokerHandTypeList.push(pokerHandType);
    };
    /**
    * 提取连牌
    * @param npcPlayer 玩家对象
    * @param pokerHandTypeList 牌型集合
    */
    PokerPresenter.prototype.extractContinuityPorker = function (npcPlayer, vec) {
        var vecTem = new Array(); // 临时数组
        var vecFan = new Array(); // 存放要重新返还vec里的牌 
        var pk = null;
        for (var i = 0; i < vec.length; i++) {
            //将相连的牌加入临时数组中
            var pk1 = vec[i].pokerArray[0];
            if ((vec[i].pokerType == PokerCardType.THREE_CARD || vec[i].pokerType == PokerCardType.DOUBLE_CARD || vec[i].pokerType == PokerCardType.SINGLE_CARD) && (pk == null || (pk.pokerValue - 1 == pk1.pokerValue && pk.pokerValue < this.ER))) {
                pk = pk1;
                vecTem.push(vec[i]);
                // iter = vec.erase(iter); 
                i++;
            }
            else {
                if (pk == null) {
                    i++;
                }
                pk = null;
                if (vecTem.length >= 5) {
                    var xing = new PokerHandType();
                    xing.pokerType = PokerCardType.CONNECT_CARD;
                    for (var i = 0; i < vecTem.length; i++) {
                        if (vecTem[i].pokerType == PokerCardType.THREE_CARD) {
                            //将多余的两张保存返回数组vecFan中  
                            var xing1 = new PokerHandType();
                            xing1.pokerType = PokerCardType.DOUBLE_CARD;
                            xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                            vecTem[i].pokerArray.pop();
                            xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                            vecTem[i].pokerArray.pop();
                            vecFan.push(xing1);
                            //将剩余一张保存xing中 
                            xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                        }
                        if (vecTem[i].pokerType == PokerCardType.DOUBLE_CARD) {
                            //将多余的一张保存返回数组vecFan中  
                            var xing1 = new PokerHandType();
                            xing1.pokerType = PokerCardType.SINGLE_CARD;
                            xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                            vecTem[i].pokerArray.pop();
                            vecFan.push(xing1);
                            //将剩余一张保存xing中 
                            xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                        }
                        if (vecTem[i].pokerType == PokerCardType.SINGLE_CARD) {
                            xing.pokerArray.push(vecTem[i].pokerArray[i]);
                        }
                    }
                    vecTem = new Array();
                    npcPlayer.pokerHandTypeList.push(xing);
                }
                else if (vecTem.length > 0) {
                    vecFan = vecFan.concat(vecTem);
                    vecTem = new Array();
                }
            }
        }
        if (vecTem.length > 0) {
            if (vecTem.length >= 5) {
                var xing = new PokerHandType();
                xing.pokerType = PokerCardType.CONNECT_CARD;
                for (var i = 0; i < vecTem.length; i++) {
                    if (vecTem[i].pokerType == PokerCardType.THREE_CARD) {
                        //将多余的两张保存返回数组vecFan中  
                        var xing1 = new PokerHandType();
                        xing1.pokerType = PokerCardType.DOUBLE_CARD;
                        xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                        vecTem[i].pokerArray.pop();
                        xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                        vecTem[i].pokerArray.pop();
                        vecFan.push(xing1);
                        //将剩余一张保存xing中 
                        xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                    }
                    if (vecTem[i].pokerType == PokerCardType.DOUBLE_CARD) {
                        //将多余的一张保存返回数组vecFan中  
                        var xing1 = new PokerHandType();
                        xing1.pokerType = PokerCardType.SINGLE_CARD;
                        xing1.pokerArray.push(vecTem[i].pokerArray[vecTem[i].pokerArray.length - 1]);
                        vecTem[i].pokerArray.pop();
                        vecFan.push(xing1);
                        //将剩余一张保存xing中  
                        xing.pokerArray = xing.pokerArray.concat(vecTem[i].pokerArray);
                    }
                    if (vecTem[i].pokerType == PokerCardType.SINGLE_CARD) {
                        xing.pokerArray.push(vecTem[i].pokerArray[0]);
                    }
                }
                vecTem = new Array();
                npcPlayer.pokerHandTypeList.push(xing);
            }
            else if (vecTem.length > 0) {
                vecFan = vecFan.concat(vecTem);
                vecTem = new Array();
            }
        }
        //将vecFan返回到vec数组中并从大到小排序
        if (vecFan.length > 0) {
            vec = vec.concat(vecFan);
            // 稳定排序 xxx
            //  stable_sort(vec.begin(),vec.end(),isShorter1); 
        }
    };
    /**
     * 出牌
     * @param npcPlayer 机器人
     */
    PokerPresenter.prototype.sendPoker = function (npcPlayer) {
        // for (var index = 0; index < this.mPlayPokerList.length; index++) {
        //     var element = this.mPlayPokerList[index];
        //     element.img.removeSelf();
        // }
        // if(this.paiDuanPokerType() != PokerCardType.ERROR_CARD || this.mPlayPokerList.length <= 0){
        // if(npcPlayer.name == "NPC A"){
        //     this.mPlayPokerTag = 1;
        // }else{
        //     this.mPlayPokerTag = 2;
        // }
        // this.mPlayPokerList = new Array<Poker>();
        // var paramSize:number =  npcPlayer.mHandPokerList.length;
        // var tempPokerList:Array<Poker> = new Array<Poker>();
        // for (var i = 0; i < paramSize; i++) {
        //     var temp:Poker =  npcPlayer.mHandPokerList[i];
        //     if(temp.isSelect){
        //         // 添加到出牌集合中
        //         this.mPlayPokerList.push(temp);
        //     }else{
        //         tempPokerList.push(temp);
        //     }
        // }
        // npcPlayer.mHandPokerList = new Array<Poker>();
        // npcPlayer.mHandPokerList= tempPokerList;
        // 排序出牌集合并且展示
        Utils.sortPlayPokerList(this.mPlayPokerList);
        // this.showPlayPoker(this.mPlayPokerList);
        this.showPlayPokerByPlayerType(npcPlayer, this.mPlayPokerList);
        // 排序原有牌集合
        Utils.sortPokerList(npcPlayer.mHandPokerList);
        //  }else{
        //        GameMain.noticeView.setLableText(npcPlayer.name+"出牌错误！！！");
        //  }
    };
    /**
    * 机器人出牌策略
    * @param parmPlayer 机器人
    * @param parmOutArray 出的牌
    * @param parmOutPlayer 出牌的玩家
    */
    PokerPresenter.prototype.npcOutPoker = function (parmPlayer, out, out1) {
        //隐藏上一次出的牌  
        this.goneLastSendPoker();
        out = new Array();
        // UI操作
        //out1为上一次出的牌  
        //  out1.mHandPokerList = new Array<Poker>();
        //打出牌值最小的一个牌型，也就是排在第一位置的牌型
        var px = parmPlayer.pokerHandTypeList[0];
        //xxx   out->removeAllObjects(); 
        //三条出牌原则 
        if (px.pokerType == PokerCardType.THREE_CARD) {
            // 稳定排序 xxx
            // stable_sort(npc->m_vecPX.begin(),npc->m_vecPX.end(),isShorter1); 
            this.m_type = PokerCardType.THREE_CARD;
            var length = parmPlayer.pokerHandTypeList.length;
            //带单
            for (var i = 0; i < length; i++) {
                //除非只剩两手牌，否则不能带王和2  
                var pk = parmPlayer.pokerHandTypeList[i].pokerArray[0];
                if (pk.pokerValue == this.ER && parmPlayer.pokerHandTypeList.length != 1) {
                    break;
                }
                if (parmPlayer.pokerHandTypeList[i].pokerType == PokerCardType.SINGLE_CARD) {
                    var iter = parmPlayer.pokerHandTypeList[i];
                    // out1.mHandPokerList.push(parmPlayer.pokerHandTypeList[i].pokerArray[0]);
                    out.push(parmPlayer.pokerHandTypeList[i].pokerArray[0]);
                    parmPlayer.mHandPokerList = Utils.removeArray(parmPlayer.mHandPokerList, parmPlayer.pokerHandTypeList[i].pokerArray[0]);
                    // npc->m_vecPX.erase(iter);   xxx
                    length = Utils.removeArrayByAny(parmPlayer.pokerHandTypeList, i);
                    this.m_type = PokerCardType.THREE_ONE_CARD;
                    this.mPlayPokerList = out;
                    break;
                }
            }
            // 带双
            if (out1.mHandPokerList.length == 0) {
                var length = parmPlayer.pokerHandTypeList.length;
                for (var index = 0; index < length; index++) {
                    //除非只剩两手牌，否则不能带王和2  
                    var pk = parmPlayer.pokerHandTypeList[index].pokerArray[0];
                    if (pk.pokerValue == this.ER && parmPlayer.pokerHandTypeList.length != 1) {
                        break;
                    }
                    if (parmPlayer.pokerHandTypeList[index].pokerType == PokerCardType.DOUBLE_CARD) {
                        for (var i = 0; i < parmPlayer.pokerHandTypeList[index].pokerArray.length; i++) {
                            var it = parmPlayer.pokerHandTypeList[index].pokerArray[i];
                            // out1.mHandPokerList.push(it);
                            out.push(it);
                            parmPlayer.mHandPokerList = Utils.removeArray(parmPlayer.mHandPokerList, it);
                        }
                        length = Utils.removeArrayByAny(parmPlayer.pokerHandTypeList, index);
                        this.m_type = PokerCardType.THREE_TWO_CARD;
                        this.mPlayPokerList = out;
                        break;
                    }
                }
            }
        }
        //三顺出牌原则 
        if (px.pokerType == PokerCardType.AIRCRAFT_CARD) {
            //有足够的单就带单  
            //  stable_sort(npc->m_vecPX.begin(),npc->m_vecPX.end(),isShorter1);  xxx 稳定排序
            this.m_type = PokerCardType.AIRCRAFT_CARD;
            if (this.getNpcPokerTypeNum(parmPlayer, PokerCardType.SINGLE_CARD) >= px.pokerArray.length / 3) {
                var num = 0;
                var length = parmPlayer.pokerHandTypeList.length;
                for (var i = 0; i != length && num < px.pokerArray.length / 3;) {
                    if (parmPlayer.pokerHandTypeList[i].pokerType == PokerCardType.SINGLE_CARD) {
                        num++;
                        // out1.mHandPokerList.push(parmPlayer.pokerHandTypeList[i].pokerArray[0]);
                        out.push(parmPlayer.pokerHandTypeList[i].pokerArray[0]);
                        parmPlayer.mHandPokerList = Utils.removeArray(parmPlayer.mHandPokerList, parmPlayer.pokerHandTypeList[i].pokerArray[0]);
                        length = Utils.removeArrayByAny(parmPlayer.pokerHandTypeList, i);
                        //  it = npc->m_vecPX.erase(it);  xxx
                        this.m_type = PokerCardType.AIRCRAFT_SINGLE_CARD;
                        i++;
                    }
                    else {
                        i++;
                    }
                }
                //有足够的双就带双 
                if (this.getNpcPokerTypeNum(parmPlayer, PokerCardType.DOUBLE_CARD) >= px.pokerArray.length / 3 && out1.mHandPokerList.length == 0) {
                    var num = 0;
                    var length = parmPlayer.pokerHandTypeList.length;
                    for (var i = 0; i != length && num < px.pokerArray.length / 3;) {
                        var it1 = parmPlayer.pokerHandTypeList[i];
                        if (it1.pokerType == PokerCardType.DOUBLE_CARD) {
                            num++;
                            for (var j = 0; j < it1.pokerArray.length; j++) {
                                var ite = it1.pokerArray[j];
                                // out1.mHandPokerList.push(ite);
                                out.push(ite);
                                parmPlayer.mHandPokerList = Utils.removeArray(parmPlayer.mHandPokerList, ite);
                                this.m_type = PokerCardType.AIRCRAFT_DOBULE_CARD;
                            }
                            length = Utils.removeArrayByAny(parmPlayer.pokerHandTypeList, i);
                            i++;
                            // xxx it = npc->m_vecPX.erase(it);  
                        }
                        else {
                            i++;
                        }
                    }
                }
            }
            this.mPlayPokerList = out;
        }
        //连牌出牌原则,直接出，不做处理 
        if (px.pokerType == PokerCardType.CONNECT_CARD) {
            this.m_type = PokerCardType.CONNECT_CARD;
        }
        //双顺出牌原则，直接出，不做处理 
        if (px.pokerType == PokerCardType.COMPANY_CARD) {
            this.m_type = PokerCardType.COMPANY_CARD;
        }
        this.mPlayPokerList = out;
        //对子和单子出牌原则  
        if (px.pokerType == PokerCardType.DOUBLE_CARD || px.pokerType == PokerCardType.SINGLE_CARD) {
            var threeNum = this.getNpcPokerTypeNum(parmPlayer, PokerCardType.THREE_CARD) +
                this.getNpcPokerTypeNum(parmPlayer, PokerCardType.AIRCRAFT_CARD);
            var chiBangNum = this.getNpcPokerTypeNum(parmPlayer, PokerCardType.DOUBLE_CARD) +
                this.getNpcPokerTypeNum(parmPlayer, PokerCardType.SINGLE_CARD);
            //所有三条<=所有对子+所有单牌-2，出对子，否则出三带对  
            if (threeNum <= chiBangNum - 2 || threeNum == 0) {
                if (px.pokerType = PokerCardType.DOUBLE_CARD) {
                    this.m_type = PokerCardType.DOUBLE_CARD;
                    this.mPlayPokerList = out;
                }
                if (px.pokerType = PokerCardType.SINGLE_CARD) {
                    this.m_type = PokerCardType.SINGLE_CARD;
                    this.mPlayPokerList = out;
                }
            }
            else {
                var px = parmPlayer.pokerHandTypeList[0];
                Utils.removeArrayByAny(parmPlayer.pokerHandTypeList, 0);
                parmPlayer.pokerHandTypeList.push(px);
                this.npcOutPoker(parmPlayer, out, out1);
                return;
            }
        }
        for (var i = 0; i < px.pokerArray.length; i++) {
            // out1.mHandPokerList.push(px.pokerArray[i]);
            out.push(px.pokerArray[i]);
            Utils.removeArray(parmPlayer.mHandPokerList, px.pokerArray[i]);
            parmPlayer.isOutPoker = true;
        }
        this.m_LastOut = parmPlayer;
        //从npc->m_vecPX中移除px 
        for (var i = 0; i < parmPlayer.pokerHandTypeList.length; i++) {
            if (parmPlayer.pokerHandTypeList[i].pokerType == px.pokerType && parmPlayer.pokerHandTypeList[i].pokerArray[0].pokerValue
                == px.pokerArray[0].pokerValue) {
                Utils.removeArrayByAny(parmPlayer.pokerHandTypeList, i);
                break;
            }
        }
        this.mPlayPokerList = out;
    };
    /**
    * 设置玩家要出的牌
    * @param parm 玩家要出的牌
    * @param parmHand 玩家手牌
    */
    PokerPresenter.prototype.setPokerSelect = function (parm, parmHand) {
        for (var i = 0; i < parm.length; i++) {
            var pk = parm[i];
            for (var j = 0; j < parmHand.length; j++) {
                var pk1 = parmHand[j];
                if (pk.img == pk1.img) {
                    pk1.isSelect = true;
                }
            }
        }
    };
    PokerPresenter.prototype.goneOwnHandPoker = function () {
        //隐藏上一次出的牌 
        for (var index = 0; index < this.mOwnPlayer.mHandPokerList.length; index++) {
            var element = this.mOwnPlayer.mHandPokerList[index];
            element.img.removeSelf();
        }
    };
    PokerPresenter.prototype.goneLastSendPoker = function () {
        //隐藏上一次出的牌 
        for (var index = 0; index < this.mPlayPokerList.length; index++) {
            var element = this.mPlayPokerList[index];
            element.img.removeSelf();
        }
    };
    /**
    * 机器人跟牌策略
    * @param npc 玩家
    * @param out 上一次出牌的集合
    * @param out1 上次出牌的人
    */
    PokerPresenter.prototype.npcGenPoker = function (npc, out, out1) {
        //隐藏上一次出的牌 
        this.goneLastSendPoker();
        // out1.mHandPokerList = new Array<Poker>();
        // if(this.m_isChiBang){ // xxx
        //     // UI操作
        //     out1.mHandPokerList = new Array<Poker>();
        // }
        // 找出对应牌型出牌
        for (var i = 0; i < npc.pokerHandTypeList.length; i++) {
            if (this.m_type == npc.pokerHandTypeList[i].pokerType) {
                //对飞机、连牌进行判断  
                if (this.m_type == PokerCardType.AIRCRAFT_CARD || this.m_type == PokerCardType.CONNECT_CARD || this.m_type == PokerCardType.COMPANY_CARD)
                    if (out.length != npc.pokerHandTypeList[i].pokerArray.length) {
                        continue;
                    }
                var pk = out[out.length - 1];
                var pk1 = npc.pokerHandTypeList[i].pokerArray[0];
                //如果对方是自己人大于2的牌不出
                if (!npc.isLandlord && !this.m_LastOut.isLandlord) {
                    if (pk1.pokerValue >= this.ER || this.m_type == PokerCardType.BOMB_CARD) {
                        //pass 不出牌 UI处理
                        // if(npc.name == this.mAPlayer.name){
                        this.isYaoDeQi = false;
                        GameMain.noticeView.setLableText(npc.name + "要不起！1");
                        // }
                        npc.isOutPoker = false;
                        return;
                    }
                }
                if (pk1.pokerValue > pk.pokerValue) {
                    out = new Array();
                    for (var j = 0; j < npc.pokerHandTypeList[i].pokerArray.length; j++) {
                        // out1.mHandPokerList.push( npc.pokerHandTypeList[i].pokerArray[j]);
                        npc.mHandPokerList = Utils.removeArray(npc.mHandPokerList, npc.pokerHandTypeList[i].pokerArray[j]);
                        out.push(npc.pokerHandTypeList[i].pokerArray[j]);
                    }
                    Utils.removeArrayByAny(npc.pokerHandTypeList, i);
                    npc.isOutPoker = true;
                    this.m_LastOut = npc;
                    this.mPlayPokerList = out;
                    return;
                }
            }
        }
        // // 三带一或三带二  
        // if(this.SanDaiYiOrEr(npc,out,out1)) {
        //         return;
        // }
        // // 四带单或四带双  
        // // 飞机带单或带双  
        // if(this.FeiJiDaiChiBang(npc,out,out1)) {
        //         return;
        // }
        // 如果除炸弹还剩一手牌  
        if (npc.pokerHandTypeList.length == 2) {
            for (var i = 0; i < npc.pokerHandTypeList.length; i++) {
                if (npc.pokerHandTypeList[i].pokerType == PokerCardType.BOMB_CARD && this.m_type
                    != PokerCardType.BOMB_CARD) {
                    out = new Array();
                    for (var j = 0; j < npc.pokerHandTypeList[i].pokerArray.length; j++) {
                        // out1.mHandPokerList.push( npc.pokerHandTypeList[i].pokerArray[j]);
                        npc.mHandPokerList = Utils.removeArray(npc.mHandPokerList, npc.pokerHandTypeList[i].pokerArray[j]);
                        out.push(npc.pokerHandTypeList[i].pokerArray[j]);
                    }
                    Utils.removeArrayByAny(npc.pokerHandTypeList, i);
                    this.m_LastOut = npc;
                    this.mPlayPokerList = out;
                    return;
                }
            }
        }
        // 如果出牌方是自己人不拆牌跟
        if (!npc.isLandlord && !this.m_LastOut.isLandlord) {
            // pass
            this.isYaoDeQi = false;
            GameMain.noticeView.setLableText(npc.name + "要不起！2");
            // UI处理 不出牌
            return;
        }
        // 拆单张牌跟之
        if (this.npcChaiDuan(npc, out, out1))
            return;
        // // 拆双牌跟之 
        // if(NpcChaiDui(npc,out,out1))  
        //     return; 
        // // 拆三张牌跟之 
        // if(NpcChaiSan(npc,out,out1))  
        //     return; 
        // //拆飞机牌跟之 
        // if(NpcChaiFeiJi(npc,out,out1))  
        //     return; 
        // // 拆连牌跟之 
        // if(NpcChaiLianPai(npc,out,out1))  
        //   return;  
        // 拆双顺跟之 
        if (this.npcChaiShuangShun(npc, out, out1))
            return;
        // 炸
        for (var i = 0; i < npc.pokerHandTypeList.length; i++) {
            if (npc.pokerHandTypeList[i].pokerType == PokerCardType.BOMB_CARD) {
                //如果出牌方出的不是炸弹就炸之，否则比较大小炸之  
                if (this.m_type != PokerCardType.BOMB_CARD) {
                    out = new Array();
                    for (var j = 0; j < npc.pokerHandTypeList[i].pokerArray.length; j++) {
                        // out1.mHandPokerList.push( npc.pokerHandTypeList[i].pokerArray[j]);
                        npc.mHandPokerList = Utils.removeArray(npc.mHandPokerList, npc.pokerHandTypeList[i].pokerArray[j]);
                        out.push(npc.pokerHandTypeList[i].pokerArray[j]);
                    }
                    Utils.removeArrayByAny(npc.pokerHandTypeList, j);
                    this.m_type = PokerCardType.BOMB_CARD;
                    npc.isOutPoker = true;
                    this.m_LastOut = npc;
                    this.mPlayPokerList = out;
                    return;
                }
                else {
                    var pk = out[0];
                    var pk1 = npc.pokerHandTypeList[i].pokerArray[0];
                    if (pk1.pokerValue == pk.pokerValue) {
                        out = new Array();
                        for (var j = 0; j < npc.pokerHandTypeList[i].pokerArray.length; j++) {
                            //    out1.mHandPokerList.push(npc.pokerHandTypeList[i].pokerArray[j]);
                            npc.mHandPokerList = Utils.removeArray(npc.mHandPokerList, npc.pokerHandTypeList[i].pokerArray[j]);
                            out.push(npc.pokerHandTypeList[i].pokerArray[j]);
                        }
                        Utils.removeArrayByAny(npc.pokerHandTypeList, i);
                        this.m_type = PokerCardType.BOMB_CARD;
                        npc.isOutPoker = true;
                        this.m_LastOut = npc;
                        this.mPlayPokerList = out;
                        return;
                    }
                }
            }
        }
        //pass  
        this.isYaoDeQi = false;
        GameMain.noticeView.setLableText(npc.name + "要不起！3");
        // 不出牌相关UI处理 xxx
        npc.isOutPoker = false;
    };
    /**
     * 三带一或三带二
     * @param npc 玩家
     * @param out 出牌集合
     * @param out1 上次出牌的人
     */
    PokerPresenter.prototype.sanDaiYiOrEr = function (npc, out, out1) {
        if ((this.m_type == PokerCardType.THREE_ONE_CARD || this.m_type == PokerCardType.THREE_TWO_CARD) && this.m_isChiBang) {
            //如果三带一，牌数少于4，则返回
            if (this.m_type == PokerCardType.THREE_ONE_CARD && npc.mHandPokerList.length < 4)
                return false;
            //如果三带二，如果牌里没有对，三带，双顺，三顺就返回
            if (this.m_type == PokerCardType.THREE_TWO_CARD) {
                if (npc.mHandPokerList.length < 5)
                    return false;
                var i = 0;
                for (; i < npc.pokerHandTypeList.length; i++) {
                    if (npc.pokerHandTypeList[i].pokerType == PokerCardType.DOUBLE_CARD || npc.pokerHandTypeList[i].pokerType == PokerCardType.THREE_CARD || npc.pokerHandTypeList[i].pokerType == PokerCardType.COMPANY_CARD ||
                        npc.pokerHandTypeList[i].pokerType == PokerCardType.AIRCRAFT_CARD) {
                        break;
                    }
                }
                if (i == npc.pokerHandTypeList.length)
                    return false;
            }
            this.m_count = out.length;
            //找出三带
            for (var i = 0; i < npc.pokerHandTypeList.length; i++) {
                if (npc.pokerHandTypeList[i].pokerType == PokerCardType.THREE_CARD) {
                    var pk = out[0];
                    var pk1 = npc.pokerHandTypeList[i].pokerArray[0];
                    if (pk1.pokerValue > pk.pokerValue) {
                        out = new Array();
                        for (var j = 0; j < npc.pokerHandTypeList[i].pokerArray.length; j++) {
                            npc.mHandPokerList = Utils.removeArray(npc.mHandPokerList, npc.pokerHandTypeList[i].pokerArray[j]);
                            out.push(npc.pokerHandTypeList[i].pokerArray[j]);
                            this.mPlayPokerList = out;
                        }
                        Utils.removeArrayByAny(npc.pokerHandTypeList, i);
                        this.m_isChiBang = false;
                        break;
                    }
                }
            }
        }
        if (!this.m_isChiBang) {
            //带上翅膀
            for (var j = 0; j < npc.pokerHandTypeList.length; j++) {
                //带单
                if (this.m_count == 4) {
                    if (npc.pokerHandTypeList[j].pokerType == PokerCardType.SINGLE_CARD) {
                        npc.mHandPokerList = Utils.removeArray(npc.mHandPokerList, npc.pokerHandTypeList[j].pokerArray[0]);
                        out.push(npc.pokerHandTypeList[j].pokerArray[0]);
                        Utils.removeArrayByAny(npc.pokerHandTypeList, j);
                        this.m_isChiBang = true;
                        npc.isOutPoker = true;
                        this.m_LastOut = npc;
                        this.mPlayPokerList = out;
                        return true;
                    }
                }
                //带双
                if (this.m_count == 5) {
                    if (npc.pokerHandTypeList[j].pokerType == PokerCardType.DOUBLE_CARD) {
                        for (var index = 0; index < npc.pokerHandTypeList[j].pokerArray.length; index++) {
                            npc.mHandPokerList = Utils.removeArray(npc.mHandPokerList, npc.pokerHandTypeList[j].pokerArray[index]);
                            out.push(npc.pokerHandTypeList[j].pokerArray[index]);
                        }
                        Utils.removeArrayByAny(npc.pokerHandTypeList, j);
                        this.m_isChiBang = true;
                        npc.isOutPoker = true;
                        this.m_LastOut = npc;
                        this.mPlayPokerList = out;
                        return true;
                    }
                }
            }
            if (this.m_count == 4) {
                // this.npcChaiDuan(npc, out, out1);
                return true;
            }
            if (this.m_count == 5) {
                // this.npcChaiDuan(npc, out, out1);
                return true;
            }
        }
        return false;
    };
    /**
    * 拆NPC对牌型 出牌跟上家
    * @param npc 玩家
    * @param out 出牌集合
    * @param out1 上次出牌的人
    */
    PokerPresenter.prototype.npcChaiDuan = function (npc, out, out1) {
        if (this.m_type != PokerCardType.SINGLE_CARD && this.m_type != PokerCardType.THREE_ONE_CARD && this.m_type != PokerCardType.AIRCRAFT_SINGLE_CARD) {
            return false;
        }
        //1.拆2跟之
        if (this.m_type == PokerCardType.SINGLE_CARD) {
            for (var i = 0; i < npc.pokerHandTypeList.length; i++) {
                var pk = npc.pokerHandTypeList[i].pokerArray[0];
                if (pk.pokerValue == this.ER && npc.pokerHandTypeList[i].pokerArray.length > 1) {
                    //拆一张单牌牌型加入到npc->m_vecPX中
                    var px = new PokerHandType();
                    px.pokerType = PokerCardType.SINGLE_CARD;
                    px.pokerArray.push(npc.pokerHandTypeList[i].pokerArray[npc.pokerHandTypeList[i].pokerArray.length - 1]);
                    npc.pokerHandTypeList[i].pokerArray.pop();
                    //改变剩余的牌型
                    if (npc.pokerHandTypeList[i].pokerArray.length == 3) {
                        npc.pokerHandTypeList[i].pokerType = PokerCardType.THREE_CARD;
                    }
                    if (npc.pokerHandTypeList[i].pokerArray.length == 2) {
                        npc.pokerHandTypeList[i].pokerType = PokerCardType.DOUBLE_CARD;
                    }
                    if (npc.pokerHandTypeList[i].pokerArray.length == 1) {
                        npc.pokerHandTypeList[i].pokerType = PokerCardType.SINGLE_CARD;
                    }
                    if (npc.pokerHandTypeList[i].pokerArray.length == 0) {
                        Utils.removeArrayByAny(npc.pokerHandTypeList, i);
                    }
                    //对npc->m_vecPX排序
                    npc.pokerHandTypeList.push(px);
                    // 稳定排序 xxx
                    //stable_sort(npc->m_vecPX.begin(),npc->m_vecPX.end(),isShorter1);
                    //再次进行跟牌
                    this.npcGenPoker(npc, out, out1);
                    return true;
                }
            }
        }
    };
    /**
    * 拆NPC双顺牌型 出牌跟上家
    * @param npc 玩家
    * @param out 出牌集合
    * @param out1 上次出牌的人
    */
    PokerPresenter.prototype.npcChaiShuangShun = function (npc, out, out1) {
        if (this.m_type != PokerCardType.COMPANY_CARD) {
            return false;
        }
        //1.拆不同张数的双顺
        for (var i = 0; i < npc.pokerHandTypeList.length; i++) {
            var pkFirest = out[out.length - 1];
            var pkLast = out[0];
            //从iter->vec中取out->count()个连
            var vecPk = new Array();
            for (var j = 0; j < out.length; j++) {
                vecPk.push(npc.pokerHandTypeList[i].pokerArray[j]);
            }
            var pk1Firest = vecPk[0];
            var pk1Last = vecPk[vecPk.length - 1];
            if (pk1Firest > pkFirest && pk1Last > pkLast) {
                var deqPk = new Array();
                deqPk = deqPk.concat(npc.pokerHandTypeList[i].pokerArray);
                //拆连牌牌型
                var px = new PokerHandType();
                px.pokerType = PokerCardType.CONNECT_CARD;
                for (var j = 0; j < out.length; j++) {
                    px.pokerArray.push(deqPk[0]);
                    deqPk = Utils.removeArray(deqPk, deqPk[0]);
                }
                npc.pokerHandTypeList[i].pokerArray = new Array();
                npc.pokerHandTypeList[i].pokerArray = npc.pokerHandTypeList[i].pokerArray.concat(deqPk);
                //改变剩余的牌型
                var vecPx = new Array();
                if (npc.pokerHandTypeList[i].pokerArray.length < 6) {
                    //var obj:Poker = npc.pokerHandTypeList[i].pokerArray[0];
                    var obj = 0;
                    for (var j = 0; j < 2; j++) {
                        var px1 = new PokerHandType();
                        px1.pokerType = PokerCardType.CONNECT_CARD;
                        px1.pokerArray.push(npc.pokerHandTypeList[i].pokerArray[obj++]);
                        px1.pokerArray.push(npc.pokerHandTypeList[i].pokerArray[obj++]);
                        vecPx.push(px1);
                    }
                    Utils.removeArrayByAny(npc.pokerHandTypeList, i);
                }
                //加入
                npc.pokerHandTypeList.push(px);
                npc.pokerHandTypeList = npc.pokerHandTypeList.concat(vecPx);
                // 稳定排序 xxx
                // stable_sort(npc->m_vecPX.begin(),npc->m_vecPX.end(),isShorter1);
                this.npcGenPoker(npc, out, out1);
                return true;
            }
        }
    };
    /**
    * 得到某种牌型在玩家牌型集合中的个数
    * @param parmPlayer 玩家
    * @param parmCardType 牌型
    */
    PokerPresenter.prototype.getNpcPokerTypeNum = function (parmPlayer, parmCardType) {
        var num = 0;
        for (var i = 0; i < parmPlayer.pokerHandTypeList.length; i++) {
            if (parmPlayer.pokerHandTypeList[i].pokerType == parmCardType) {
                if (parmPlayer.pokerHandTypeList[i].pokerType == PokerCardType.AIRCRAFT_CARD) {
                    num += (parmPlayer.pokerHandTypeList[i].pokerArray.length) / 3;
                }
                else {
                    num++;
                }
            }
        }
        return num;
    };
    return PokerPresenter;
}());
//# sourceMappingURL=PokerPresenter.js.map