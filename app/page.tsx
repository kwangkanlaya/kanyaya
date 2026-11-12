
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
};

const places: Place[] = [
  {
    id: 1,
    name: "อุทยานประวัติศาสตร์สุโขทัย",
    category: "ประวัติศาสตร์",
    location: "อำเภอเมืองสุโขทัย",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=900",
    description:
      "แหล่งมรดกโลกที่รวบรวมโบราณสถานและสถาปัตยกรรมอันงดงามของอาณาจักรสุโขทัย",
  },
  {
    id: 2,
    name: "วัดศรีชุม",
    category: "วัดและโบราณสถาน",
    location: "อำเภอเมืองสุโขทัย",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=900",
    description:
      "สถานที่ประดิษฐานพระอจนะ พระพุทธรูปองค์ใหญ่ที่มีความสำคัญทางประวัติศาสตร์",
  },
  {
    id: 3,
    name: "วัดมหาธาตุ",
    category: "ประวัติศาสตร์",
    location: "อำเภอเมืองสุโขทัย",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1606293926075-69a00dbf9e9d?w=900",
    description:
      "โบราณสถานสำคัญใจกลางเมืองเก่าสุโขทัย โดดเด่นด้วยเจดีย์และสถาปัตยกรรมโบราณ",
  },
  {
    id: 4,
    name: "อุทยานแห่งชาติรามคำแหง",
    category: "ธรรมชาติ",
    location: "อำเภอคีรีมาศ",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
    description:
      "แหล่งท่องเที่ยวธรรมชาติที่มีภูเขา ป่าไม้ และทิวทัศน์ที่สวยงาม",
  },
  {
    id: 5,
    name: "กิจกรรมปั่นจักรยานชมเมืองเก่า",
    category: "กิจกรรม",
    location: "อุทยานประวัติศาสตร์สุโขทัย",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=900",
    description:
      "เพลิดเพลินกับการปั่นจักรยานชมโบราณสถานและบรรยากาศเมืองเก่า",
  },
  {
    id: 6,
    name: "ที่พักบรรยากาศธรรมชาติ",
    category: "ที่พัก",
    location: "จังหวัดสุโขทัย",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=900",
    description:
      "พักผ่อนในบรรยากาศสบาย ๆ พร้อมสัมผัสธรรมชาติระหว่างการเดินทาง",
  },
  {
    id: 7,
    name: "อาหารพื้นเมืองสุโขทัย",
    category: "ร้านอาหาร",
    location: "จังหวัดสุโขทัย",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900",
    description:
      "ค้นพบอาหารท้องถิ่นและรสชาติที่เป็นเอกลักษณ์ของจังหวัดสุโขทัย",
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

const navigation = [
  { name: "หน้าหลัก", icon: "⌂" },
  { name: "สำรวจ", icon: "⌕" },
  { name: "รายการโปรด", icon: "♡" },
  { name: "บัญชี", icon: "♙" },
];

export default function Home() {
  const [page, setPage] = useState("หน้าหลัก");
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
    setFavorites((previous) => {
      const next = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];

      localStorage.setItem(
        "sukhothai-favorites",
        JSON.stringify(next)
      );

      return next;
    });
  }

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchCategory =
        category === "ทั้งหมด" ||
        place.category === category ||
        (category === "ประวัติศาสตร์" &&
          place.category === "วัดและโบราณสถาน");

      const matchSearch =
        place.name.toLowerCase().includes(search.toLowerCase()) ||
        place.location.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const favoritePlaces = places.filter((place) =>
    favorites.includes(place.id)
  );

  function goExplore(cat = "ทั้งหมด") {
    setPage("สำรวจ");
    setCategory(cat);
    setSearch("");
  }

  function Card({ place }: { place: Place }) {
    const saved = favorites.includes(place.id);

    return (
      <article className="place-card">
        <div className="place-image" onClick={() => setSelected(place)}>
          <img src={place.image} alt={place.name} />
          <span className="category-label">{place.category}</span>
        </div>

        <button
          className={`heart ${saved ? "liked" : ""}`}
          onClick={() => toggleFavorite(place.id)}
          aria-label="เพิ่มรายการโปรด"
        >
          {saved ? "♥" : "♡"}
        </button>

        <div className="place-info" onClick={() => setSelected(place)}>
          <h3>{place.name}</h3>
          <p>📍 {place.location}</p>
          <div className="rating">★ {place.rating} <span>แนะนำ</span></div>
        </div>
      </article>
    );
  }

  return (
    <main className="app">
      <div className="content">

        {/* HEADER */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">✦</div>
            <div>
              <h2>สุโขทัย</h2>
              <small>TRAVEL GUIDE</small>
            </div>
          </div>
          <button className="bell" onClick={() => alert("ไม่มีการแจ้งเตือน")}>
            ♧
          </button>
        </header>

        {/* HOME */}
        {page === "หน้าหลัก" && (
          <>
            <section className="hero">
              <img
                src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1200"
                alt="สถานที่ท่องเที่ยว"
              />
              <div className="hero-shade" />

              <div className="hero-text">
                <span>DISCOVER SUKHOTHAI</span>
                <p>ออกเดินทางไปค้นพบ</p>
                <h1>สุโขทัย</h1>
                <p className="hero-sub">
                  เมืองแห่งประวัติศาสตร์และอารยธรรมไทย
                </p>
                <button onClick={() => goExplore()}>
                  เริ่มต้นสำรวจ →
                </button>
              </div>
            </section>

            <section className="section">
              <div className="heading">
                <div>
                  <small>EXPLORE CATEGORY</small>
                  <h2>เลือกตามความสนใจ</h2>
                </div>
              </div>

              <div className="categories">
                {categories.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => goExplore(item.name)}
                  >
                    <span>{item.icon}</span>
                    <small>{item.name}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="section">
              <div className="heading">
                <div>
                  <small>POPULAR PLACES</small>
                  <h2>สถานที่ยอดนิยม</h2>
                </div>
                <button onClick={() => goExplore()}>ดูทั้งหมด →</button>
              </div>

              <div className="horizontal">
                {places.slice(0, 4).map((place) => (
                  <Card key={place.id} place={place} />
                ))}
              </div>
            </section>

            <section className="banner">
              <div>
                <small>TRAVEL WITH US</small>
                <h2>ทุกการเดินทาง</h2>
                <h2>มีเรื่องราวเสมอ</h2>
                <p>ค้นพบเสน่ห์ของสุโขทัยไปด้วยกัน</p>
                <button onClick={() => goExplore()}>
                  ค้นหาสถานที่ →
                </button>
              </div>
              <span>🧭</span>
            </section>
          </>
        )}

        {/* EXPLORE */}
        {page === "สำรวจ" && (
          <>
            <section className="page-title">
              <small>DISCOVER SUKHOTHAI</small>
              <h1>ออกไปค้นพบสิ่งใหม่</h1>
              <p>ค้นหาสถานที่ท่องเที่ยวที่คุณสนใจ</p>
            </section>

            <div className="search">
              <span>⌕</span>
              <input
                placeholder="ค้นหาสถานที่..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={() => setSearch("")}>×</button>
            </div>

            <div className="filters">
              {categories.map((item) => (
                <button
                  key={item.name}
                  className={category === item.name ? "active" : ""}
                  onClick={() => setCategory(item.name)}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="list-heading">
              <h2>สถานที่ท่องเที่ยว</h2>
              <span>{filteredPlaces.length} แห่ง</span>
            </div>

            <div className="place-list">
              {filteredPlaces.length > 0 ? (
                filteredPlaces.map((place) => (
                  <Card key={place.id} place={place} />
                ))
              ) : (
                <div className="empty">
                  <span>🔎</span>
                  <h3>ไม่พบสถานที่</h3>
                  <p>ลองเปลี่ยนคำค้นหาอีกครั้ง</p>
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
        {page === "รายการโปรด" && (
          <>
            <section className="page-title">
              <small>YOUR FAVORITES</small>
              <h1>สถานที่โปรด ♡</h1>
              <p>รวมสถานที่ที่คุณชื่นชอบ</p>
            </section>

            <div className="list-heading">
              <h2>รายการที่บันทึกไว้</h2>
              <span>{favoritePlaces.length} แห่ง</span>
            </div>

            <div className="place-list">
              {favoritePlaces.length ? (
                favoritePlaces.map((place) => (
                  <Card key={place.id} place={place} />
                ))
              ) : (
                <div className="empty">
                  <span>♡</span>
                  <h3>ยังไม่มีรายการโปรด</h3>
                  <p>กดปุ่มหัวใจเพื่อบันทึกสถานที่ที่ชอบ</p>
                  <button onClick={() => goExplore()}>
                    สำรวจสถานที่
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* PROFILE */}
        {page === "บัญชี" && (
          <section className="profile">
            <div className="avatar">👤</div>
            <small>WELCOME TRAVELER</small>
            <h1>นักเดินทาง</h1>
            <p>ยินดีต้อนรับสู่ Sukhothai Travel Guide</p>

            <div className="stats">
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
              <button onClick={() => setPage("รายการโปรด")}>
                ♡ รายการโปรด <span>›</span>
              </button>
              <button onClick={() => setPage("สำรวจ")}>
                ⌕ สำรวจสถานที่ <span>›</span>
              </button>
              <button onClick={() => setPage("หน้าหลัก")}>
                ⌂ กลับหน้าหลัก <span>›</span>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        {navigation.map((item) => (
          <button
            key={item.name}
            className={page === item.name ? "selected" : ""}
            onClick={() => setPage(item.name)}
          >
            <span>{item.icon}</span>
            <small>{item.name}</small>
          </button>
        ))}
      </nav>

      {/* DETAIL */}
      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <section className="detail" onClick={(e) => e.stopPropagation()}>
            <div className="detail-image">
              <img src={selected.image} alt={selected.name} />
              <button onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="detail-content">
              <small>{selected.category}</small>
              <h2>{selected.name}</h2>
              <p>📍 {selected.location}</p>
              <div className="rating">★ {selected.rating}</div>

              <h3>เกี่ยวกับสถานที่</h3>
              <p className="description">{selected.description}</p>

              <button
                className="save-button"
                onClick={() => toggleFavorite(selected.id)}
              >
                {favorites.includes(selected.id)
                  ? "♥ บันทึกรายการโปรดแล้ว"
                  : "♡ เพิ่มในรายการโปรด"}
              </button>
            </div>
          </section>
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f5f2ec;
          color: #39342d;
          font-family: Arial, "Noto Sans Thai", sans-serif;
        }

        button {
          font-family: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .app {
          width: 100%;
          max-width: 480px;
          min-height: 100vh;
          margin: auto;
          background: #fffdf9;
          position: relative;
          overflow: hidden;
        }

        .content {
          padding: 0 18px 100px;
          min-height: 100vh;
        }

        .header {
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .logo-icon {
          width: 43px;
          height: 43px;
          background: #fff0d5;
          border-radius: 15px;
          display: grid;
          place-items: center;
          font-size: 24px;
          color: #df943e;
        }

        .logo h2 {
          font-size: 19px;
          margin: 0;
        }

        .logo small {
          font-size: 9px;
          letter-spacing: 2px;
          color: #ae9d88;
        }

        .bell {
          border: 0;
          background: #fff0d5;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          color: #d78d3b;
          font-size: 22px;
        }

        .hero {
          height: 355px;
          border-radius: 25px;
          position: relative;
          overflow: hidden;
          color: white;
        }

        .hero > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            0deg,
            #241d19db,
            #241d1950 50%,
            transparent
          );
        }

        .hero-text {
          position: absolute;
          left: 23px;
          right: 20px;
          bottom: 35px;
        }

        .hero-text > span {
          color: #ffdf9f;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .hero-text p {
          font-size: 14px;
          margin: 12px 0 3px;
        }

        .hero-text h1 {
          font-size: 43px;
          margin: 0;
          font-weight: 900;
        }

        .hero-text .hero-sub {
          font-size: 12px;
          margin: 8px 0 18px;
        }

        .hero-text button,
        .banner button {
          background: #f4b65d;
          color: #573b1c;
          border: 0;
          border-radius: 30px;
          padding: 12px 20px;
          font-size: 12px;
          font-weight: bold;
        }

        .section {
          margin-top: 29px;
        }

        .heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .heading small,
        .page-title small {
          color: #d69344;
          font-size: 9px;
          letter-spacing: 1.5px;
          font-weight: bold;
        }

        .heading h2 {
          font-size: 18px;
          margin: 5px 0;
        }

        .heading > button {
          border: 0;
          background: none;
          color: #d18b3d;
          font-size: 11px;
        }

        .categories {
          display: flex;
          overflow-x: auto;
          gap: 13px;
          scrollbar-width: none;
          padding-bottom: 8px;
        }

        .categories button {
          flex: 0 0 72px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          border: 0;
          background: none;
          color: #51483d;
        }

        .categories button span {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          background: #fff1da;
          display: grid;
          place-items: center;
          font-size: 24px;
        }

        .categories button small {
          font-size: 10px;
        }

        .horizontal {
          display: flex;
          overflow-x: auto;
          gap: 13px;
          scrollbar-width: none;
        }

        .place-card {
          width: 100%;
          flex-shrink: 0;
          position: relative;
          background: white;
          border: 1px solid #f1ebdf;
          border-radius: 19px;
          overflow: hidden;
          margin-bottom: 14px;
        }

        .horizontal .place-card {
          width: 235px;
        }

        .place-image {
          height: 165px;
          position: relative;
          cursor: pointer;
          background: #eee4d6;
        }

        .place-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .category-label {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 10px;
          border-radius: 20px;
          background: #fffaf0e8;
          color: #a96a2e;
          font-size: 9px;
        }

        .heart {
          position: absolute;
          right: 11px;
          top: 11px;
          width: 35px;
          height: 35px;
          border: 0;
          background: white;
          border-radius: 50%;
          font-size: 20px;
          color: #c4a18c;
          z-index: 2;
        }

        .heart.liked {
          color: #e65f50;
        }

        .place-info {
          padding: 12px 13px 15px;
          cursor: pointer;
        }

        .place-info h3 {
          font-size: 13px;
          margin: 0 0 8px;
        }

        .place-info p {
          font-size: 10px;
          color: #9b9185;
          margin: 0 0 8px;
        }

        .rating {
          font-size: 11px;
          font-weight: bold;
          color: #e3a044;
        }

        .rating span {
          margin-left: 7px;
          background: #fff2df;
          border-radius: 12px;
          padding: 4px 8px;
          font-size: 9px;
        }

        .banner {
          margin-top: 20px;
          padding: 22px;
          min-height: 160px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 22px;
          background: linear-gradient(120deg, #fff0d2, #ffdfb3);
        }

        .banner small {
          color: #ba7a36;
          letter-spacing: 1px;
          font-size: 9px;
        }

        .banner h2 {
          font-size: 17px;
          margin: 6px 0;
        }

        .banner p {
          font-size: 10px;
          color: #927a5e;
        }

        .banner > span {
          font-size: 42px;
        }

        .page-title {
          padding: 25px 0 18px;
        }

        .page-title h1 {
          font-size: 24px;
          margin: 9px 0;
        }

        .page-title p {
          font-size: 12px;
          color: #a59a8c;
        }

        .search {
          height: 51px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 14px;
          border: 1px solid #f0e8db;
          border-radius: 15px;
          background: white;
        }

        .search span {
          font-size: 24px;
          color: #c58b49;
        }

        .search input {
          flex: 1;
          width: 0;
          border: 0;
          outline: none;
          font-size: 12px;
          background: transparent;
        }

        .search button {
          border: 0;
          background: none;
          color: #a69b8e;
        }

        .filters {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 16px 0;
          scrollbar-width: none;
        }

        .filters button {
          flex-shrink: 0;
          border: 1px solid #eee5d8;
          background: white;
          color: #8d8172;
          padding: 9px 14px;
          border-radius: 25px;
          font-size: 10px;
        }

        .filters button.active {
          background: #e99d4d;
          color: white;
          border-color: #e99d4d;
        }

        .list-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 14px 0;
        }

        .list-heading h2 {
          font-size: 16px;
        }

        .list-heading span {
          font-size: 10px;
          color: #d68e41;
        }

        .place-list .place-image {
          height: 175px;
        }

        .empty {
          text-align: center;
          padding: 65px 10px;
        }

        .empty > span {
          font-size: 45px;
          color: #d99a4b;
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
          border-radius: 25px;
          padding: 12px 20px;
          background: #e99d4d;
          color: white;
        }

        .profile {
          text-align: center;
          padding-top: 45px;
        }

        .avatar {
          width: 100px;
          height: 100px;
          margin: auto auto 20px;
          background: #fff0d5;
          border-radius: 35px;
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
          color: #a69a8b;
          font-size: 12px;
        }

        .stats {
          display: flex;
          background: #fff4e3;
          border-radius: 20px;
          padding: 20px;
          margin: 30px 0;
        }

        .stats div {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .stats strong {
          font-size: 25px;
          color: #d98c39;
        }

        .stats span {
          font-size: 11px;
        }

        .profile-menu {
          padding: 5px 15px;
          background: white;
          border: 1px solid #f2eee7;
          border-radius: 18px;
        }

        .profile-menu button {
          width: 100%;
          padding: 18px 5px;
          border: 0;
          border-bottom: 1px solid #f4eee6;
          background: white;
          text-align: left;
          font-size: 12px;
        }

        .profile-menu button span {
          float: right;
          color: #c5b7a5;
        }

        .bottom-nav {
          position: fixed;
          z-index: 20;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 480px;
          height: calc(76px + env(safe-area-inset-bottom));
          padding: 8px 10px env(safe-area-inset-bottom);
          background: #ffffffed;
          backdrop-filter: blur(16px);
          border-top: 1px solid #f2ebdf;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .bottom-nav button {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          border: 0;
          background: transparent;
          color: #aaa194;
        }

        .bottom-nav button > span {
          font-size: 25px;
          line-height: 1.2;
        }

        .bottom-nav button small {
          font-size: 10px;
        }

        .bottom-nav button.selected {
          color: #df913e;
          font-weight: bold;
        }

        .bottom-nav button.selected > span {
          background: #fff0d8;
          width: 48px;
          border-radius: 15px;
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
        }

        .detail-image {
          height: 230px;
          position: relative;
        }

        .detail-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-image button {
          position: absolute;
          top: 15px;
          right: 15px;
          border: 0;
          border-radius: 50%;
          width: 38px;
          height: 38px;
          background: white;
        }

        .detail-content {
          padding: 22px;
        }

        .detail-content > small {
          color: #d28b42;
        }

        .detail-content h2 {
          font-size: 22px;
        }

        .detail-content p {
          font-size: 12px;
          color: #968a7a;
        }

        .detail-content h3 {
          font-size: 14px;
          margin-top: 25px;
        }

        .detail-content .description {
          line-height: 1.9;
          font-size: 13px;
        }

        .save-button {
          width: 100%;
          background: #e99d4d;
          color: white;
          border: 0;
          border-radius: 15px;
          padding: 15px;
          margin-top: 20px;
          font-weight: bold;
        }

        @media (min-width: 600px) {
          body {
            padding: 20px 0;
          }

          .app {
            border-radius: 28px;
            box-shadow: 0 0 40px #6c5a4015;
          }

          .bottom-nav {
            bottom: 20px;
            border-radius: 0 0 28px 28px;
          }
        }

        @media (max-width: 350px) {
          .content {
            padding-left: 12px;
            padding-right: 12px;
          }

          .hero {
            height: 320px;
          }
        }
      `}</style>
    </main>
  );
}
