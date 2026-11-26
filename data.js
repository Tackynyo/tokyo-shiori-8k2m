/**
 * 東京 1泊2日 旅のしおり - 旅程・持ち物データ
 * 時間やテキストを変更したい場合は、このファイルを編集してください。
 *
 * 【画像の追加方法】
 * 1. images フォルダに画像（例：tsukiji.jpg）を入れる
 * 2. 各予定の image に "./images/tsukiji.jpg"、imageCaption に説明文（任意）を入力する
 * ※ 複数枚載せたい場合は image の代わりに以下のように書けます：
 *    images: [{ src: "./images/a.jpg", caption: "説明1" }, { src: "./images/b.jpg", caption: "説明2" }]
 */
const TRIP_DATA = {
  meta: {
    title: "東京 1泊2日 旅のしおり",
    dates: "2026年12月8日（火）～ 12月9日（水）",
  },

  days: {
    day1: {
      dateLabel: "1日目：2026年12月8日（火）",
      theme: "築地グルメとスカイツリーの夜景",
      items: [
        {
          time: "12:12",
          title: "東京駅 到着",
          transport: "新幹線 ➔ 駅構内移動",
          category: "train",
          detail:
            "新幹線到着後、東京駅構内を移動し、東京メトロ丸ノ内線「東京駅」に向かう。",
          memo: "",
          mapQuery: "",
          image: "./images/tokyostation.jpg",
          imageCaption: "",
        },
        {
          time: "12:30",
          title: "東京駅 ➔ 築地へ移動",
          transport: "地下鉄（約10～15分）",
          category: "subway",
          detail:
            "丸ノ内線「東京駅」から「銀座駅」で日比谷線に乗り換え、「築地駅」に移動する。",
          memo: "",
          mapQuery: "築地魚河岸 小田原橋棟",
          image: "",
          imageCaption: "",
        },
        {
          time: "12:45",
          title: "築地「魚河岸食堂」でランチ",
          transport: "食事（約60分）",
          category: "food",
          detail:
            "築地魚河岸（小田原橋棟）3階の食堂で新鮮な海鮮丼や揚げ物・定食ランチ。12/8(火)は市場の開場日のため営業。",
          memo:
            "13:30頃から店じまいが始まるため、到着後早めに座席を確保して注文する。",
          mapQuery: "魚河岸食堂 築地",
          image: "./images/tsukiji.jpg",
          imageCaption: "",
        },
        {
          time: "14:00",
          title: "築地 ➔ 東京スカイツリーへ移動",
          transport: "地下鉄（日比谷線→半蔵門線 約30分）",
          category: "subway",
          detail:
            "押上（東京スカイツリー前）へ移動。展望台の入場時間まで東京ソラマチ内をゆったり散策。",
          memo: "",
          mapQuery: "東京スカイツリー",
          image: "",
          imageCaption: "",
        },
        {
          time: "15:30",
          title: "東京スカイツリー 展望台（予約済）",
          transport: "観光（約90分）",
          category: "sightseeing",
          detail:
            "暖かい屋内展望台から東京を一望。16:28頃の日没に合わせて、明るい景色・夕焼け・夜景の移り変わりをすべて楽しむ。",
          memo: "チケットQRコード（または予約画面）を事前に準備。",
          mapQuery: "",
          image: "./images/skytree.jpg",
          imageCaption: "",
        },
        {
          time: "17:30",
          title: "東京ソラマチで夕食",
          transport: "食事（約75分）",
          category: "food",
          detail:
            "スカイツリー直結のソラマチ内レストラン街で、外の寒さを避けてゆっくり夕食。",
          memo: "",
          mapQuery: "東京ソラマチ",
          image: "./images/soramachi.jpg",
          imageCaption: "",
        },
        {
          time: "19:00",
          title: "三ノ輪駅周辺のホテルへ移動・チェックイン",
          transport: "地下鉄（約30分）",
          category: "subway",
          detail: "押上駅から地下鉄で三ノ輪駅周辺へ移動し、ホテルにチェックイン。",
          memo: "",
          mapQuery: "",
          image: "",
          imageCaption: "",
        },
      ],
    },

    day2: {
      dateLabel: "2日目：2026年12月9日（水）",
      theme: "朝の浅草と最新渋谷をめぐる",
      items: [
        {
          time: "08:40",
          title: "ホテル出発 ➔ 大和アパート見学",
          transport: "徒歩（約10分）",
          category: "walk",
          detail: "ホテルを出発し、徒歩で移動。",
          memo: "",
          mapQuery: "",
          image: "",
          imageCaption: "",
        },
        {
          time: "09:15",
          title: "バスで浅草寺付近に移動・朝食・仲見世通り散策",
          transport: "バス（約15分）",
          category: "bus",
          detail:
            "ここで朝食をとった後、雷門・仲見世通り・浅草寺を散策。午前中は午後に比べて人出が落ち着いており、自分のペースで歩きやすい時間帯。",
          memo: "",
          mapQuery: "浅草寺 雷門",
          image: "",
          imageCaption: "",
        },
        {
          time: "12:00",
          title: "浅草 ➔ 渋谷へ直通移動",
          transport: "東京メトロ銀座線（始発・約33分）",
          category: "subway",
          detail:
            "浅草駅は銀座線の始発駅のため、座ったまま乗り換えなしで終点・渋谷駅まで移動。",
          memo:
            "渋谷駅では「ヒカリエ方面改札」を利用すると駅直結の建物へスムーズに入れる。",
          mapQuery: "",
          image: "",
          imageCaption: "",
        },
        {
          time: "12:40",
          title: "渋谷ヒカリエ11階「スカイロビー」で展望観賞",
          transport: "観光（約30分）",
          category: "sightseeing",
          detail:
            "入場無料の展望フロアから、有名なスクランブル交差点や新宿・東京タワー方面のビル群をガラス越しに安全に見下ろす。",
          memo: "",
          mapQuery: "",
          image: "",
          imageCaption: "",
        },
        {
          time: "13:20",
          title: "渋谷ヒカリエ / スクランブルスクエアでランチ",
          transport: "食事（約60分）",
          category: "food",
          detail:
            "駅直結のレストラン街へエレベーターで移動。地上の人混みや冷たい外気に当たらず、景色を眺めながらランチを楽しむ。",
          memo: "",
          mapQuery: "渋谷ヒカリエ",
          image: "",
          imageCaption: "",
        },
        {
          time: "14:30",
          title: "SHIBUYA TSUTAYA",
          transport: "徒歩（約30分）",
          category: "walk",
          detail:
            "スクランブル交差点や「忠犬ハチ公像」を見つつ、SHIBUYA TSUTAYAへ移動。沙梨ちゃんのグッズを受け取る。",
          memo: "",
          mapQuery: "忠犬ハチ公像",
          image: "",
          imageCaption: "",
        },
        {
          time: "15:10",
          title: "渋谷 ➔ 東京駅へ移動",
          transport: "銀座線 ➔ 赤坂見附で丸ノ内線に対面乗換（約20～25分）",
          category: "subway",
          detail:
            "渋谷駅から銀座線に乗り、赤坂見附駅で同じホーム向かい側の丸ノ内線へ階段なしで乗り換えて東京駅へ。",
          memo: "",
          mapQuery: "",
          image: "",
          imageCaption: "",
        },
        {
          time: "15:45",
          title: "東京駅 到着・荷物受取・お土産購入",
          transport: "買い物（約40分）",
          category: "shopping",
          detail:
            "1日目に預けたコインロッカーから荷物を回収し、大丸東京やグランスタでお土産を購入。",
          memo: "",
          mapQuery: "東京駅",
          image: "./images/tokyostation.jpg",
          imageCaption: "",
        },
        {
          time: "16:33",
          title: "東京駅 出発",
          transport: "新幹線",
          category: "train",
          detail: "少し早めに新幹線ホームへ上がり、帰路へ。",
          memo: "",
          mapQuery: "",
          image: "",
          imageCaption: "",
        },
      ],
    },
  },

  checklist: [
    {
      id: "tickets-ic",
      label: "新幹線チケット / ICカード（チャージ確認）",
    },
    {
      id: "winter-gear",
      label: "防寒対策(マフラー・手袋・使い捨てカイロ)",
    },
  ],
};
