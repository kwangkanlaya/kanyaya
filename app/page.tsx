
"use client";

import { useEffect, useMemo, useState } from "react";

type Place = {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: string;
  image: string;
  description: string;
  hours: string;
};

const places: Place[] = [
  {
    id: 1,
    name: "อุทยานประวัติศาสตร์สุโขทัย",
    category: "ประวัติศาสตร์",
    location: "อำเภอเมืองสุโขทัย",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbpay1?auto=format&fit=crop&w=1000&q=85",
    description:
      "สัมผัสความงดงามของเมืองเก่าสุโขทัย แหล่งมรดกโลกที่เต็มไปด้วยเรื่องราวทางประวัติศาสตร์ สถาปัตยกรรม และวัฒนธรรมไทย",
    hours: "โปรดตรวจสอบเวลาเข้าชม",
  },
  {
    id: 2,
    name: "วัดมหาธาตุ",
    category: "วัดและโบราณสถาน",
    location: "อำเภอเมืองสุโขทัย",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=85",
    description:
      "โบราณสถานสำคัญใจกลางเมืองเก่าสุโขทัย มีเจดีย์ประธานและกลุ่มโบราณสถานที่สะท้อนความรุ่งเรืองของอาณาจักร",
    hours: "โปรดตรวจสอบเวลาเข้าชม",
  },
  {
    id: 3,
    name: "วัดศรีชุม",
    category: "วัดและโบราณสถาน",
    location: "อำเภอเมืองสุโขทัย",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1000&q=85",
    description:
      "สถานที่ประดิษฐานพระอจนะ พระพุทธรูปองค์ใหญ่ภายในมณฑป เป็นสถานที่สำคัญที่ไม่ควรพลาด",
    hours: "โปรดตรวจสอบเวลาเข้าชม",
  },
  {
    id: 4,
    name: "อุทยานแห่งชาติรามคำแหง",
    category: "ธรรมชาติ",
    location: "อำเภอคีรีมาศ",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",
    description:
      "สัมผัสธรรมชาติ ภูเขา และทิวทัศน์ที่สวยงาม เหมาะสำหรับผู้ที่ชื่นชอบการท่องเที่ยวเชิงธรรมชาติ",
    hours: "ตรวจสอบประกาศของอุทยาน",
  },
  {
    id: 5,
    name: "ปั่นจักรยานชมเมืองเก่า",
    category: "กิจกรรม",
    location: "อุทยานประวัติศาสตร์สุโขทัย",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1000&q=85",
    description:
      "ปั่นจักรยานชมโบราณสถานและสัมผัสบรรยากาศเมืองเก่าในแบบที่แตกต่าง",
    hours: "แนะนำช่วงเช้าและเย็น",
  },
  {
    id: 6,
    name: "ที่พักบรรยากาศธรรมชาติ",
    category: "ที่พัก",
    location: "จังหวัดสุโขทัย",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1000&q=85",
    description:
      "ตัวอย่างที่พักสำหรับนักเดินทางที่ต้องการพักผ่อนท่ามกลางบรรยากาศธรรมชาติ",
    hours: "ตรวจสอบกับที่พัก",
  },
  {
    id: 7,
    name: "อาหารพื้นเมืองสุโขทัย",
    category: "ร้านอาหาร",
    location: "จังหวัดสุโขทัย",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85",
    description:
      "ค้นพบอาหารพื้นเมืองและเมนูอร่อยที่เป็นเอกลักษณ์ของจังหวัดสุโขทัย",
    hours: "ตรวจสอบเวลาเปิดร้าน",
  },
];

const categories = [
  { name: "ทั้งหมด", icon: "✦" },
  { name: "ประวัติศาสตร์", icon: "🏛️" },
  { name: "ธรรมชาติ", icon: "🌳" },
  { name: "กิจกรรม", icon: "🚲" },
  { name: "ที่พัก", icon: "🏨" },
  { name: "ร้านอาหาร", icon: "🍜" },
];

const navItems = [
  { name: "หน้าหลัก", icon: "⌂" },
  { name: "สำรวจ", icon: "⌕" },
  { name: "รายการโปรด", icon: "♡" },
  { name: "บัญชี", icon: "♙" },
];

export default function Page() {
  const [tab, setTab] = useState("หน้าหลัก");
  const [category, setCategory] = useState("ทั้งหมด");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sukhothai-favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      setFavorites([]);
    }
  }, []);

  function toggleFavorite(id: number) {
    setFavorites((old) => {
      const next = old.includes(id)
        ? old.filter((x) => x !== id)
        : [...old, id];

      localStorage.setItem(
        "sukhothai-favorites",
        JSON.stringify(next)
      );

      return next;
    });
  }

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchCategory =
        category === "ทั้งหมด" ||
        p.category === category ||
        (category === "ประวัติศาสตร์" &&
          p.category === "วัดและโบราณสถาน");

      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const favoritePlaces = places.filter((p) =>
    favorites.includes(p.id)
  );

  function openExplore(cat = "ทั้งหมด") {
    setCategory(cat);
    setSearch("");
    setTab("สำรวจ");
  }

  function PlaceCard({ place }: { place: Place }) {
    const saved = favorites.includes(place.id);

    return (
      <article className="place-card">
        <button
          className="place-photo"
          onClick={() => setSelected(place)}
        >
          <img src={place.image} alt={place.name} />
          <span className="photo-category">{place.category}</span>
        </button>

        <button
          className={`heart ${saved ? "saved" : ""}`}
          onClick={() => toggleFavorite(place.id)}
          aria-label="เพิ่มรายการโปรด"
        >
          {saved ? "♥" : "♡"}
        </button>

        <button
          className="place-info"
          onClick={() => setSelected(place)}
        >
          <h3>{place.name}</h3>
          <p>📍 {place.location}</p>
          <div className="rating">★ {place.rating} <span>แนะนำ</span></div>
        </button>
      </article>
    );
  }

  return (
    <main className="app">
      <div className="phone-content">
        {/* HEADER */}
        <header className="header">
          <div className="brand">
            <div className="brand-icon">✦</div>
            <div>
              <h2>สุโขทัย</h2>
              <small>TRAVEL GUIDE</small>
            </div>
          </div>

          <button
            className="notification"
            onClick={() => alert("ไม่มีการแจ้งเตือนใหม่")}
          >
            ♧
            <span />
          </button>
        </header>

        {/* HOME */}
        {tab === "หน้าหลัก" && (
          <>
            <section className="hero">
              <img
                src="https://images.unsplash.com/photo-1606293926075-69a00dbpay1?auto=format&fit=crop&w=1400&q=90"
                alt="บรรยากาศสุโขทัย"
              />
              <div className="hero-overlay" />

              <div className="hero-text">
                <span className="hero-label">✦ DISCOVER THAILAND</span>
                <p>ออกเดินทางไปค้นพบ</p>
                <h1>สุโขทัย</h1>
                <p className="hero-description">
                  เมืองแห่งประวัติศาสตร์และอารยธรรมไทย
                </p>
                <button
                  className="hero-button"
                  onClick={() => openExplore()}
                >
                  เริ่มต้นสำรวจ <span>→</span>
                </button>
              </div>

              <div className="hero-indicator">
                <i className="active" />
                <i />
                <i />
              </div>
            </section>

            {/* CATEGORY */}
            <section className="section">
              <div className="section-title">
                <div>
                  <small>EXPLORE BY CATEGORY</small>
                  <h2>เลือกตามความสนใจ</h2>
                </div>
                <span>✦</span>
              </div>

              <div className="category-scroll">
                {categories.map((c) => (
                  <button
                    key={c.name}
                    className="category-item"
                    onClick={() => openExplore(c.name)}
                  >
                    <span className="category-icon">{c.icon}</span>
                    <b>{c.name}</b>
                  </button>
                ))}
              </div>
            </section>

            {/* POPULAR */}
            <section className="section">
              <div className="section-title">
                <div>
                  <small>POPULAR DESTINATIONS</small>
                  <h2>สถานที่ยอดนิยม</h2>
                </div>
                <button onClick={() => openExplore()}>
                  ดูทั้งหมด →
                </button>
              </div>

              <div className="horizontal-scroll">
                {places.slice(0, 4).map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </section>

            {/* BANNER */}
            <section className="travel-banner">
              <div>
                <span>TRAVEL WITH US</span>
                <h2>ทุกการเดินทาง</h2>
                <h2>มีเรื่องราวเสมอ</h2>
                <p>ค้นพบเสน่ห์ของสุโขทัยไปด้วยกัน</p>
                <button onClick={() => openExplore()}>
                  ค้นหาสถานที่ →
                </button>
              </div>
              <div className="banner-icon">🧭</div>
            </section>
          </>
        )}

        {/* EXPLORE */}
        {tab === "สำรวจ" && (
          <>
            <section className="page-heading">
              <small>DISCOVER SUKHOTHAI</small>
              <h1>ออกไปค้นพบสิ่งใหม่</h1>
              <p>ค้นหาสถานที่ที่คุณอยากไป</p>
            </section>

            <div className="search-box">
              <span>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ค้นหาสถานที่ท่องเที่ยว..."
              />
              <button onClick={() => setSearch("")}>✕</button>
            </div>

            <div className="filter-scroll">
              {categories.map((c) => (
                <button
                  key={c.name}
                  className={category === c.name ? "filter active" : "filter"}
                  onClick={() => setCategory(c.name)}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="result-heading">
              <h2>สถานที่ท่องเที่ยว</h2>
              <span>{filtered.length} แห่ง</span>
            </div>

            <div className="place-list">
              {filtered.length ? (
                filtered.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))
              ) : (
                <div className="empty">
                  <span>🔎</span>
                  <h3>ไม่พบสถานที่</h3>
                  <p>ลองค้นหาด้วยคำอื่นอีกครั้ง</p>
                  <button onClick={() => {
                    setSearch("");
                    setCategory("ทั้งหมด");
                  }}>
                    ล้างการค้นหา
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* FAVORITES */}
        {tab === "รายการโปรด" && (
          <>
            <section className="page-heading">
              <small>YOUR FAVORITES</small>
              <h1>สถานที่ที่คุณชอบ ♡</h1>
              <p>รวบรวมสถานที่โปรดไว้ในที่เดียว</p>
            </section>

            <div className="result-heading">
              <h2>รายการที่บันทึก</h2>
              <span>{favoritePlaces.length} แห่ง</span>
            </div>

            <div className="place-list">
              {favoritePlaces.length ? (
                favoritePlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))
              ) : (
                <div className="empty">
                  <span>♡</span>
                  <h3>ยังไม่มีรายการโปรด</h3>
                  <p>กดหัวใจบนสถานที่ที่คุณชื่นชอบ</p>
                  <button onClick={() => openExplore()}>
                    ไปสำรวจสถานที่
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* PROFILE */}
        {tab === "บัญชี" && (
          <section className="profile">
            <div className="profile-avatar">👤</div>
            <small>WELCOME TRAVELER</small>
            <h1>นักเดินทาง</h1>
            <p>ยินดีต้อนรับสู่ Sukhothai Travel Guide</p>

            <div className="profile-stats">
              <div>
                <strong>{favorites.length}</strong>
                <span>รายการโปรด</span>
              </div>
              <div>
                <strong>{places.length}</strong>
                <span>สถานที่แนะนำ</span>
              </div>
            </div>

            <div className="profile-menu">
              <button onClick={() => setTab("รายการโปรด")}>
                <span>♡</span> รายการโปรด <b>›</b>
              </button>
              <button onClick={() => setTab("สำรวจ")}>
                <span>⌕</span> สำรวจสถานที่ <b>›</b>
              </button>
              <button onClick={() => setTab("หน้าหลัก")}>
                <span>⌂</span> กลับหน้าหลัก <b>›</b>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={tab === item.name ? "nav-button active" : "nav-button"}
            onClick={() => setTab(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            <small>{item.name}</small>
          </button>
        ))}
      </nav>

      {/* DETAIL MODAL */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <article
            className="detail"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="detail-image">
              <img src={selected.image} alt={selected.name} />
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="detail-body">
              <span className="detail-category">{selected.category}</span>

              <h2>{selected.name}</h2>
              <p className="detail-location">📍 {selected.location}</p>
              <p className="detail-rating">★ {selected.rating}</p>

              <h3>เกี่ยวกับสถานที่</h3>
              <p className="detail-description">{selected.description}</p>

              <div className="detail-hours">
                <span>◷</span>
                <div>
                  <b>เวลาเข้าชม</b>
                  <p>{selected.hours}</p>
                </div>
              </div>

              <button
                className="detail-button"
                onClick={() => toggleFavorite(selected.id)}
              >
                {favorites.includes(selected.id)
                  ? "♥ บันทึกรายการโปรดแล้ว"
                  : "♡ เพิ่มในรายการโปรด"}
              </button>
            </div>
          </article>
        </div>
      )}

      {/* SELF CONTAINED CSS */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          background: #f5f3ee;
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: Arial, "Noto Sans Thai", sans-serif;
          color: #39342d;
          background: #f5f3ee;
        }

        button {
          font: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .app {
          width: 100%;
          min-height: 100vh;
          background: #fffdf9;
          margin: auto;
          position: relative;
          overflow: hidden;
        }

        .phone-content {
          width: 100%;
          max-width: 480px;
          margin: auto;
          min-height: 100vh;
          padding: 0 18px 105px;
        }

        .header {
          height: 75px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          width: 43px;
          height: 43px;
          border-radius: 15px;
          background: #ffedc8;
          color: #e88b30;
          display: grid;
          place-items: center;
          font-size: 25px;
        }

        .brand h2 {
          font-size: 19px;
          margin: 0;
          font-weight: 800;
        }

        .brand small {
          color: #b3a18b;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .notification {
          width: 42px;
          height: 42px;
          border: 0;
          background: #fff2dd;
          border-radius: 15px;
          color: #db8b34;
          font-size: 23px;
          position: relative;
        }

        .notification span {
          position: absolute;
          top: 9px;
          right: 10px;
          width: 7px;
          height: 7px;
          background: #f27a48;
          border-radius: 50%;
        }

        .hero {
          height: 355px;
          position: relative;
          border-radius: 25px;
          overflow: hidden;
          color: white;
          box-shadow: 0 12px 30px #c89b6540;
        }

        .hero > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            0deg,
            #30271dce 0%,
            #30271d70 42%,
            transparent 100%
          );
        }

        .hero-text {
          position: absolute;
          bottom: 40px;
          left: 23px;
          right: 20px;
        }

        .hero-label {
          font-size: 10px;
          letter-spacing: 2px;
          color: #ffe2a9;
          font-weight: bold;
        }

        .hero-text > p {
          font-size: 14px;
          margin: 13px 0 0;
        }

        .hero-text h1 {
          font-size: 42px;
          line-height: 1.2;
          margin: 2px 0;
          font-weight: 900;
        }

        .hero-text .hero-description {
          font-size: 12px;
          margin: 8px 0 18px;
        }

        .hero-button {
          border: 0;
          background: #ffbd61;
          color: #553b1f;
          border-radius: 30px;
          padding: 12px 20px;
          font-size: 12px;
          font-weight: 800;
        }

        .hero-button span {
          margin-left: 10px;
        }

        .hero-indicator {
          position: absolute;
          bottom: 15px;
          right: 22px;
          display: flex;
          gap: 5px;
        }

        .hero-indicator i {
          width: 6px;
          height: 6px;
          border-radius: 10px;
          background: #ffffff80;
        }

        .hero-indicator .active {
          width: 19px;
          background: #ffbd61;
        }

        .section {
          margin-top: 29px;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title small,
        .page-heading small {
          font-size: 9px;
          letter-spacing: 1.5px;
          color: #d69a51;
          font-weight: 800;
        }

        .section-title h2 {
          margin: 5px 0 0;
          font-size: 18px;
        }

        .section-title > span {
          color: #e4a04d;
          font-size: 23px;
        }

        .section-title button {
          border: 0;
          background: none;
          color: #d68c3c;
          font-size: 11px;
          font-weight: bold;
        }

        .category-scroll {
          display: flex;
          overflow-x: auto;
          gap: 13px;
          padding: 2px 0 9px;
          scrollbar-width: none;
        }

        .category-scroll::-webkit-scrollbar,
        .horizontal-scroll::-webkit-scrollbar,
        .filter-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-item {
          flex: 0 0 76px;
          border: 0;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #51483d;
          font-size: 10px;
        }

        .category-icon {
          width: 62px;
          height: 62px;
          border-radius: 21px;
          display: grid;
          place-items: center;
          background: #fff1d9;
          font-size: 25px;
          transition: .2s;
        }

        .category-item:active .category-icon {
          transform: scale(.93);
        }

        .horizontal-scroll {
          display: flex;
          overflow-x: auto;
          gap: 13px;
          padding-bottom: 10px;
          scrollbar-width: none;
        }

        .place-card {
          position: relative;
          flex: 0 0 auto;
          width: 100%;
          background: white;
          border-radius: 19px;
          overflow: hidden;
          box-shadow: 0 5px 18px #7e68400d;
          border: 1px solid #f3eee6;
          margin-bottom: 13px;
        }

        .horizontal-scroll .place-card {
          width: 235px;
        }

        .place-photo {
          height: 160px;
          width: 100%;
          display: block;
          position: relative;
          border: 0;
          padding: 0;
          overflow: hidden;
          background: #eee4d6;
        }

        .place-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .3s;
        }

        .place-photo:active img {
          transform: scale(1.04);
        }

        .photo-category {
          position: absolute;
          left: 12px;
          top: 12px;
          background: #fffaf0e8;
          color: #a96a2e;
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 9px;
          font-weight: bold;
        }

        .heart {
          position: absolute;
          top: 11px;
          right: 11px;
          width: 35px;
          height: 35px;
          border: 0;
          border-radius: 50%;
          background: white;
          color: #d4a18a;
          font-size: 21px;
          z-index: 2;
        }

        .heart.saved {
          color: #e66b51;
        }

        .place-info {
          display: block;
          width: 100%;
          text-align: left;
          padding: 12px 13px 14px;
          border: 0;
          background: white;
          color: #403a32;
        }

        .place-info h3 {
          margin: 0 0 8px;
          font-size: 13px;
          line-height: 1.5;
        }

        .place-info p {
          font-size: 10px;
          color: #9a9286;
          margin: 0 0 8px;
        }

        .rating {
          color: #e39a39;
          font-size: 11px;
          font-weight: bold;
        }

        .rating span {
          background: #fff4e3;
          border-radius: 12px;
          padding: 3px 8px;
          margin-left: 6px;
          font-size: 9px;
        }

        .travel-banner {
          margin-top: 17px;
          border-radius: 22px;
          padding: 22px;
          min-height: 160px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(120deg, #ffefce, #ffe0b3);
          margin-bottom: 20px;
        }

        .travel-banner span {
          font-size: 9px;
          letter-spacing: 2px;
          color: #bb7c36;
          font-weight: bold;
        }

        .travel-banner h2 {
          font-size: 17px;
          margin: 6px 0;
        }

        .travel-banner p {
          font-size: 10px;
          color: #8f785e;
        }

        .travel-banner button {
          border: 0;
          background: #e89c48;
          color: white;
          border-radius: 30px;
          padding: 10px 15px;
          font-size: 10px;
          margin-top: 7px;
        }

        .banner-icon {
          font-size: 45px;
        }

        .page-heading {
          padding: 22px 0 18px;
        }

        .page-heading h1 {
          font-size: 24px;
          margin: 9px 0 5px;
        }

        .page-heading p {
          color: #a59b8e;
          font-size: 12px;
        }

        .search-box {
          height: 51px;
          border: 1px solid #f0e8db;
          background: #fff;
          border-radius: 15px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          gap: 10px;
          color: #c38c4e;
        }

        .search-box > span {
          font-size: 25px;
        }

        .search-box input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: 0;
          font-size: 12px;
          color: #4c443a;
          background: transparent;
        }

        .search-box button {
          border: 0;
          background: transparent;
          color: #a99e91;
        }

        .filter-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 17px 0;
          scrollbar-width: none;
        }

        .filter {
          white-space: nowrap;
          border: 1px solid #eee5d8;
          background: white;
          color: #8d8172;
          padding: 9px 14px;
          border-radius: 25px;
          font-size: 10px;
        }

        .filter.active {
          background: #e99d4d;
          color: white;
          border-color: #e99d4d;
        }

        .result-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 12px 0 17px;
        }

        .result-heading h2 {
          font-size: 16px;
        }

        .result-heading span {
          font-size: 10px;
          color: #d68e41;
        }

        .place-list .place-card {
          width: 100%;
        }

        .place-list .place-photo {
          height: 175px;
        }

        .empty {
          text-align: center;
          padding: 60px 15px;
        }

        .empty > span {
          font-size: 45px;
          color: #e6a35b;
        }

        .empty h3 {
          font-size: 17px;
        }

        .empty p {
          font-size: 12px;
          color: #a69c90;
        }

        .empty button {
          border: 0;
          background: #e99d4d;
          color: white;
          border-radius: 25px;
          padding: 12px 20px;
          margin-top: 15px;
        }

        .profile {
          text-align: center;
          padding: 45px 5px 20px;
        }

        .profile-avatar {
          width: 105px;
          height: 105px;
          background: #ffedcf;
          border-radius: 35px;
          margin: 0 auto 20px;
          display: grid;
          place-items: center;
          font-size: 45px;
        }

        .profile > small {
          color: #d89950;
          letter-spacing: 2px;
        }

        .profile h1 {
          font-size: 25px;
        }

        .profile > p {
          font-size: 12px;
          color: #a69a8b;
        }

        .profile-stats {
          display: flex;
          background: #fff4e3;
          border-radius: 20px;
          padding: 20px;
          margin: 30px 0;
        }

        .profile-stats div {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .profile-stats strong {
          font-size: 25px;
          color: #d98c39;
        }

        .profile-stats span {
          font-size: 11px;
        }

        .profile-menu {
          background: white;
          border-radius: 18px;
          padding: 5px 15px;
          border: 1px solid #f2eee7;
        }

        .profile-menu button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 17px 5px;
          border: 0;
          border-bottom: 1px solid #f4eee6;
          background: white;
          text-align: left;
          gap: 13px;
          font-size: 12px;
        }

        .profile-menu button span {
          color: #dc984e;
          font-size: 20px;
        }

        .profile-menu button b {
          margin-left: auto;
          color: #c5b7a5;
        }

        .bottom-nav {
          position: fixed;
          z-index: 20;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          max-width: 480px;
          margin: auto;
          height: calc(76px + env(safe-area-inset-bottom));
          padding: 8px 10px env(safe-area-inset-bottom);
          background: #ffffffed;
          backdrop-filter: blur(16px);
          border-top: 1px solid #f2ebdf;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .nav-button {
          flex: 1;
          border: 0;
          background: transparent;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #aaa194;
        }

        .nav-icon {
          font-size: 25px;
          line-height: 1;
        }

        .nav-button small {
          font-size: 10px;
        }

        .nav-button.active {
          color: #df913e;
          font-weight: bold;
        }

        .nav-button.active .nav-icon {
          background: #fff0d8;
          width: 48px;
          height: 31px;
          border-radius: 15px;
          display: grid;
          place-items: center;
        }

        .modal {
          position: fixed;
          z-index: 50;
          inset: 0;
          background: #2e261eb8;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 12px;
        }

        .detail {
          width: 100%;
          max-width: 460px;
          max-height: 90vh;
          overflow-y: auto;
          background: #fffdf9;
          border-radius: 25px;
          animation: slideUp .25s ease;
        }

        .detail-image {
          height: 240px;
          position: relative;
        }

        .detail-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-image button {
          position: absolute;
          right: 15px;
          top: 15px;
          border: 0;
          background: white;
          border-radius: 50%;
          width: 38px;
          height: 38px;
        }

        .detail-body {
          padding: 22px;
        }

        .detail-category {
          color: #d28b42;
          font-size: 11px;
        }

        .detail-body h2 {
          font-size: 22px;
          margin: 9px 0;
        }

        .detail-location,
        .detail-rating {
          font-size: 12px;
          color: #a2927d;
        }

        .detail-rating {
          color: #e3a044;
        }

        .detail-body h3 {
          font-size: 14px;
          margin-top: 24px;
        }

        .detail-description {
          font-size: 13px;
          line-height: 1.9;
          color: #84796b;
        }

        .detail-hours {
          display: flex;
          gap: 13px;
          padding: 15px;
          background: #fff2df;
          border-radius: 14px;
          margin: 20px 0;
        }

        .detail-hours span {
          font-size: 22px;
          color: #d48d3e;
        }

        .detail-hours b {
          font-size: 12px;
        }

        .detail-hours p {
          font-size: 11px;
          margin: 5px 0;
        }

        .detail-button {
          width: 100%;
          background: #e99d4d;
          color: white;
          border: 0;
          border-radius: 15px;
          padding: 15px;
          font-weight: bold;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (min-width: 600px) {
          .app {
            max-width: 480px;
            min-height: 100vh;
            box-shadow: 0 0 50px #6c5a4015;
          }

          .bottom-nav {
            box-shadow: 0 -5px 20px #6c5a400c;
          }
        }

        @media (min-width: 900px) {
          body {
            padding: 25px 0;
          }

          .app {
            border-radius: 30px;
            min-height: calc(100vh - 50px);
          }

          .bottom-nav {
            bottom: 25px;
            border-radius: 0 0 30px 30px;
          }
        }

        @media (max-width: 350px) {
          .phone-content {
            padding-left: 13px;
            padding-right: 13px;
          }

          .hero {
            height: 320px;
          }

          .hero-text h1 {
            font-size: 35px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
