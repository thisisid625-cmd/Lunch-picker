import { useState } from "react";

const restaurants = [
  {
    id: 1,
    name: "조선옥",
    category: "한식",
    remark: "🍲 갈비탕",
    naverUrl: "https://naver.me/xs3GwUKB",
  },
  {
    id: 2,
    name: "힛토",
    category: "일식",
    remark: "🍣 스시(점심특선)",
    naverUrl: "https://naver.me/FoIrUoRS",
  },
  {
    id: 3,
    name: "까이9",
    category: "아시안",
    remark: "🍜 태국음식",
    naverUrl: "https://naver.me/xTT67k4H",
  },
  {
    id: 4,
    name: "진중 우육면관",
    category: "중식",
    remark: "🍜 우육면",
    naverUrl: "https://naver.me/GUwSpzGZ",
  },
  {
    id: 5,
    name: "파작",
    category: "양식",
    remark: "🥪 샌드위치",
    naverUrl: "https://naver.me/GCvrUnZI",
  },
  // 👉 여기 아래에 엑셀 나머지 식당들
  // 같은 형식으로 계속 추가하면 됨
];

const lionMessages = [
  "오늘은 여기 어때?",
  "이 집 괜찮아 보여!",
  "점심은 이걸로 가자 🍽️",
  "여기 한 번 가보자!",
  "오늘 운명은 여기야",
  "맛있을 것 같은데?",
  "망설이면 배고파 😋",
];

export default function App() {
  const [picked, setPicked] = useState(null);
  const [category, setCategory] = useState("전체");
  const [excludedToday, setExcludedToday] = useState([]);
  const [lionMessage, setLionMessage] = useState("");

  const filteredRestaurants = restaurants.filter((r) => {
    const categoryMatch =
      category === "전체" || r.category === category;
    const notExcluded = !excludedToday.includes(r.id);
    return categoryMatch && notExcluded;
  });

  const pickRandom = () => {
    if (filteredRestaurants.length === 0) {
      setPicked(null);
      return;
    }

    const choice =
      filteredRestaurants[
        Math.floor(Math.random() * filteredRestaurants.length)
      ];

    setPicked(choice);
    setExcludedToday([...excludedToday, choice.id]);
    setLionMessage(
      lionMessages[
        Math.floor(Math.random() * lionMessages.length)
      ]
    );
  };

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "0 auto",
        padding: 16,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>
        오늘 점심 뭐 먹지? 🦁
      </h2>

      {picked ? (
        <div
          style={{
            background: "#FFF4D6",
            borderRadius: 18,
            padding: 16,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          <h3 style={{ marginBottom: 4 }}>{picked.name}</h3>

          <div style={{ marginBottom: 8, fontSize: 15 }}>
            {picked.remark}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 12,
              gap: 6,
            }}
          >
            <span>🦁</span>
            <span
              style={{
                background: "#fff",
                padding: "6px 10px",
                borderRadius: 14,
                fontSize: 13,
              }}
            >
              {lionMessage}
            </span>
          </div>

          {picked.naverUrl}
            네이버 지도에서 보기
          </a>

          <button
            onClick={pickRandom}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ccc",
              background: "#fff",
            }}
          >
            ❌ 오늘은 이거 말고
          </button>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          랜덤 추천 버튼을 눌러주세요 🍽️
        </p>
      )}

      <button
        onClick={pickRandom}
        style={{
          width: "100%",
          padding: 14,
          fontSize: 16,
          borderRadius: 14,
          background: "#FFD54F",
          border: "none",
          fontWeight: "bold",
          marginBottom: 12,
        }}
      >
        🎲 랜덤 추천
      </button>

      <div style={{ textAlign: "center" }}>
        {["전체", "한식", "중식", "일식", "양식", "아시안"].map(
          (c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                margin: 4,
                padding: "6px 10px",
                borderRadius: 12,
                border: "1px solid #ccc",
                background:
                  c === category ? "#FFE082" : "#fff",
                fontSize: 13,
              }}
            >
              {c}
            </button>
          )
        )}
      </div>
    </div>
  );
}
