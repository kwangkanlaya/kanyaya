
"use client";

import { useMemo, useState } from "react";

type Place = {
  id: number;
  name: string;
  category: string;
  rating: string;
  location: string;
  image: string;
  hours: string;
  description: string;
};

const places: Place[] = [
  {
    id: 1,
    name: "อุทยานประวัติศาสตร์สุโขทัย",
    category: "วัดและโบราณสถาน",
    rating: "4.8",
    location: "อำเภอเมืองสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85",
    hours: "ตัวอย่างเวลา 06.30–18.00 น.",
    description:
      "แหล่งมรดกโลกทางวัฒนธรรมที่รวบรวมโบราณสถานสำคัญของอาณาจักรสุโขทัย เหมาะสำหรับการเรียนรู้ประวัติศาสตร์และชมความงดงามของสถาปัตยกรรมไทย",
  },
  {
    id: 2,
    name: "วัดมหาธาตุ",
    category: "วัดและโบราณสถาน",
    rating: "4.7",
    location: "อำเภอเมืองสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1000&q=85",
    hours: "โปรดตรวจสอบเวลาเข้าชม",
    description:
      "โบราณสถานสำคัญใจกลางเมืองเก่าสุโขทัย มีเจดีย์และโบราณสถานที่สะท้อนถึงความรุ่งเรืองของอาณาจักรสุโขทัย",
  },
  {
    id: 3,
    name: "วัดศรีชุม",
    category: "วัดและโบราณสถาน",
    rating: "4.6",
    location: "อำเภอเมืองสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbpay1?auto=format&fit=crop&w=1000&q=85",
    hours: "โปรดตรวจสอบเวลาเข้าชม",
    description:
      "สถานที่ประดิษฐานพระอจนะ พระพุทธรูปองค์ใหญ่ภายในมณฑป เป็นหนึ่งในสถานที่ท่องเที่ยวที่มีชื่อเสียงของสุโขทัย",
  },
  {
    id: 4,
    name: "อุทยานแห่งชาติรามคำแหง",
    category: "ธรรมชาติ",
    rating: "4.5",
    location: "อำเภอคีรีมาศ",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
    hours: "ตรวจสอบประกาศของอุทยาน",
    description:
      "สถานที่ท่องเที่ยวทางธรรมชาติ เหมาะสำหรับผู้ที่ชื่นชอบภูเขา การเดินป่า และการชมวิวทิวทัศน์",
  },
  {
    id: 5,
    name: "กิจกรรมปั่นจักรยานชมเมืองเก่า",
    category: "กิจกรรม",
    rating: "4.7",
    location: "อุทยานประวัติศาสตร์สุโขทัย",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1000&q=85",
    hours: "แนะนำช่วงเช้าและเย็น",
    description:
      "กิจกรรมปั่นจักรยานชมบรรยากาศเมืองเก่าและโบราณสถานโดยรอบอย่างเพลิดเพลิน",
  },
  {
    id: 6,
    name: "ที่พักบรรยากาศธรรมชาติ",
    category: "ที่พัก",
    rating: "4.6",
    location: "จังหวัดสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=85",
    hours: "ขึ้นอยู่กับเวลาเช็กอินของที่พัก",
    description:
      "ตัวอย่างที่พักสำหรับนักเดินทางที่ต้องการพักผ่อนและสัมผัสบรรยากาศของจังหวัดสุโขทัย",
  },
  {
    id: 7,
    name: "อาหารพื้นเมืองสุโขทัย",
    category: "ร้านอาหาร",
    rating: "4.5",
    location: "จังหวัดสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
    hours: "ตรวจสอบเวลาเปิดร้านก่อนเดินทาง",
    description:
      "ค้นพบอาหารพื้นเมืองและร้านอาหารที่น่าสนใจระหว่างการเดินทางท่องเที่ยวสุโขทัย",
  },
];

const categories = [
  { label: "สถานที่ท่องเที่ยว", icon: "📍", filter: "ทั้งหมด" },
  { label: "กิจกรรม", icon: "🚴", filter: "กิจกรรม" },
  { label: "ที่พัก", icon: "🏨", filter: "ที่พัก" },
  { label: "ร้านอาหาร", icon: "🍜", filter: "ร้านอาหาร" },
];

const navItems = [
  { label: "หน้าหลัก", icon: "⌂" },
  { label: "สำรวจ", icon: "◎" },
  { label: "รายการโปรด", icon: "♡" },
  { label: "บัญชี", icon: "♙" },
];

function SectionHeading({
  title,
  action,
  onClick,
}: {
  title: string;
  action?: string;
  onClick?: () => void;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {action && (
        <button type="button" onClick={onClick}>
          {action} <span>›</span>
        </button>
      )}
    </div>
  );
}

function PlaceCard({
  place,
  favorite,
  onFavorite,
  onOpen,
  compact = false,
}: {
  place: Place;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
  compact?: boolean;
}) {
  return (
    <article className={`place-card ${compact ? "compact" : ""}`}>
      <button
        type="button"
        className="place-open"
        onClick={onOpen}
      >
        <img src={place.image} alt={place.name} />

        <div className="place-info">
          <h3>{place.name}</h3>

          <div className="place-meta">
            <span>★ {place.rating}</span>
            <span>📍 {place.location}</span>
          </div>
        </div>
      </button>

      <button
        type="button"
        className={`card-heart ${favorite ? "saved" : ""}`}
        onClick={onFavorite}
        aria-label={favorite ? "นำออกจากรายการโปรด" : "เพิ่มรายการโปรด"}
      >
        {favorite ? "♥" : "♡"}
      </button>
    </article>
  );
}

function EmptyState({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <span style={{ fontSize: 32 }}>♡</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>

      <button
        type="button"
        className="primary-button"
        onClick={onClick}
      >
        ไปสำรวจสถานที่ →
      </button>
    </div>
  );
}

export default function HomePage() {
  const [tab, setTab] = useState("หน้าหลัก");
  const [category, setCategory] = useState("ทั้งหมด");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory =
        category === "ทั้งหมด" || place.category === category;

      const searchText = query.trim().toLowerCase();

      const matchesSearch =
        place.name.toLowerCase().includes(searchText) ||
        place.location.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const favoritePlaces = places.filter((place) =>
    favorites.includes(place.id)
  );

  function toggleFavorite(id: number) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function openCategory(filter: string) {
    setCategory(filter);
    setQuery("");
    setTab("สำรวจ");
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* HEADER */}
      <header className="topbar">
        <button
          type="button"
          className="icon-button"
          aria-label="เมนู"
          onClick={() => setTab("หน้าหลัก")}
        >
          ☰
        </button>

        <div className="brand">
          <span className="brand-mark">✦</span>
          <span>สุโขทัย</span>
        </div>

        <button
          type="button"
          className="icon-button notification"
          aria-label="การแจ้งเตือน"
          onClick={() => alert("ไม่มีการแจ้งเตือนใหม่")}
        >
          ♧
          <i />
        </button>
      </header>

      {/* HOME PAGE */}
      {tab === "หน้าหลัก" && (
        <>
          <section className="hero">
            <img
              src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85"
              alt="บรรยากาศสถานที่ท่องเที่ยว"
            />

            <div className="hero-shade" />

            <div className="hero-copy">
              <span className="hero-tag">เมืองมรดกโลก</span>
              <p>ยินดีต้อนรับสู่</p>
              <h1>จังหวัดสุโขทัย</h1>
              <span className="hero-sub">
                เมืองแห่งประวัติศาสตร์และอารยธรรมไทย
              </span>

              <button
                type="button"
                className="hero-cta"
                onClick={() => setTab("สำรวจ")}
              >
                สำรวจสถานที่ <span>→</span>
              </button>
            </div>

            <div className="hero-dots">
              <i className="active" />
              <i />
              <i />
            </div>
          </section>

          <section className="category-grid">
            {categories.map((item) => (
              <button
                type="button"
                className="category-tile"
                key={item.label}
                onClick={() => openCategory(item.filter)}
              >
                <span>{item.icon}</span>
                <b>{item.label}</b>
              </button>
            ))}
          </section>

          <SectionHeading
            title="แนะนำสถานที่ยอดนิยม"
            action="ดูทั้งหมด"
            onClick={() => setTab("สำรวจ")}
          />

          <div className="horizontal-cards">
            {places.slice(0, 3).map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                favorite={favorites.includes(place.id)}
                onFavorite={() => toggleFavorite(place.id)}
                onOpen={() => setSelected(place)}
                compact
              />
            ))}
          </div>

          <section className="tip-banner">
            <div>
              <span className="eyebrow">TRAVEL TIP</span>
              <h3>เที่ยวสุโขทัยให้คุ้ม</h3>
              <p>วางแผนการเดินทางและค้นหาสถานที่ที่คุณชื่นชอบ</p>
            </div>
            <span style={{ fontSize: 36 }}>🧭</span>
          </section>
        </>
      )}

      {/* EXPLORE PAGE */}
      {tab === "สำรวจ" && (
        <>
          <div className="page-heading">
            <span className="eyebrow">DISCOVER SUKHOTHAI</span>
            <h1>ค้นพบสถานที่ใหม่</h1>
            <p>เลือกจุดหมายที่คุณอยากออกไปสัมผัส</p>
          </div>

          <div className="search-row">
            <span>⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ค้นหาสถานที่ท่องเที่ยว..."
            />

            <button
              type="button"
              aria-label="ล้างคำค้นหา"
              onClick={() => setQuery("")}
            >
              ✕
            </button>
          </div>

          <div className="chips">
            {[
              "ทั้งหมด",
              "วัดและโบราณสถาน",
              "ธรรมชาติ",
              "กิจกรรม",
              "ที่พัก",
              "ร้านอาหาร",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item ? "chip selected" : "chip"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <SectionHeading
            title="สถานที่ท่องเที่ยว"
            action={`${filteredPlaces.length} แห่ง`}
          />

          <div className="place-list">
            {filteredPlaces.length > 0 ? (
              filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  favorite={favorites.includes(place.id)}
                  onFavorite={() => toggleFavorite(place.id)}
                  onOpen={() => setSelected(place)}
                />
              ))
            ) : (
              <EmptyState
                title="ไม่พบสถานที่"
                description="ลองเปลี่ยนคำค้นหาหรือหมวดหมู่"
                onClick={() => {
                  setQuery("");
                  setCategory("ทั้งหมด");
                }}
              />
            )}
          </div>
        </>
      )}

      {/* FAVORITES PAGE */}
      {tab === "รายการโปรด" && (
        <>
          <div className="page-heading">
            <span className="eyebrow">YOUR COLLECTION</span>
            <h1>รายการโปรด ♡</h1>
            <p>สถานที่ที่คุณบันทึกไว้สำหรับการเดินทาง</p>
          </div>

          <SectionHeading
            title="สถานที่ที่บันทึกไว้"
            action={`${favoritePlaces.length} แห่ง`}
          />

          <div className="place-list">
            {favoritePlaces.length > 0 ? (
              favoritePlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  favorite
                  onFavorite={() => toggleFavorite(place.id)}
                  onOpen={() => setSelected(place)}
                />
              ))
            ) : (
              <EmptyState
                title="ยังไม่มีรายการโปรด"
                description="กดรูปหัวใจบนสถานที่ที่ชอบ เพื่อบันทึกไว้ที่นี่"
                onClick={() => setTab("สำรวจ")}
              />
            )}
          </div>
        </>
      )}

      {/* ACCOUNT PAGE */}
      {tab === "บัญชี" && (
        <section className="profile-view">
          <div className="profile-avatar">
            <span style={{ fontSize: 38 }}>♙</span>
          </div>

          <p className="eyebrow">WELCOME TRAVELER</p>
          <h1>นักเดินทาง</h1>

          <p className="muted">
            เริ่มออกเดินทางและค้นพบเรื่องราวของสุโขทัย
          </p>

          <div className="profile-stat">
            <div>
              <b>{favorites.length}</b>
              <span>สถานที่โปรด</span>
            </div>
            <div>
              <b>{categories.length}</b>
              <span>หมวดหมู่</span>
            </div>
          </div>

          <button
            type="button"
            className="outline-button"
            onClick={() => setTab("หน้าหลัก")}
          >
            กลับหน้าหลัก
          </button>
        </section>
      )}

      {/* BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            className={
              tab === item.label ? "nav-item active" : "nav-item"
            }
            onClick={() => setTab(item.label)}
          >
            <span style={{ fontSize: 23, lineHeight: 1 }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* DETAIL MODAL */}
      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <article
            className="detail-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="ปิด"
            >
              ✕
            </button>

            <img
              className="detail-image"
              src={selected.image}
              alt={selected.name}
            />

            <div className="detail-content">
              <div className="detail-title-row">
                <div>
                  <span className="eyebrow">
                    {selected.category}
                  </span>
                  <h2>{selected.name}</h2>
                </div>

                <button
                  type="button"
                  className="heart-button"
                  onClick={() => toggleFavorite(selected.id)}
                >
                  {favorites.includes(selected.id) ? "♥" : "♡"}
                </button>
              </div>

              <div className="meta-line">
                <span>★ {selected.rating}</span>
                <span>📍 {selected.location}</span>
              </div>

              <p>{selected.description}</p>

              <div className="info-row">
                <span>◷</span>
                {selected.hours}
              </div>

              <div className="info-row">
                <span>🚗</span>
                ตรวจสอบเส้นทางก่อนออกเดินทาง
              </div>

              <button
                type="button"
                className="primary-button full"
                onClick={() => setSelected(null)}
              >
                <span>✓</span>
                ปิดรายละเอียด
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
