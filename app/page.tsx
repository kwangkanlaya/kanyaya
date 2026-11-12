
"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Car,
  ChevronRight,
  Clock3,
  Compass,
  Heart,
  Home,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  Star,
  UserRound,
  Utensils,
  BedDouble,
  X,
  Navigation,
  Sparkles,
} from "lucide-react";

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
      "https://images.unsplash.com/photo-1606293926075-69a00dbpay1?auto=format&fit=crop&w=1200&q=85",
    hours: "ทุกวัน 06.30–18.00 น.",
    description:
      "แหล่งมรดกโลกทางวัฒนธรรมที่รวบรวมโบราณสถานสำคัญของอาณาจักรสุโขทัย ท่ามกลางบรรยากาศร่มรื่นและสวยงาม",
  },
  {
    id: 2,
    name: "วัดมหาธาตุ",
    category: "วัดและโบราณสถาน",
    rating: "4.7",
    location: "อำเภอเมืองสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    hours: "ทุกวัน 06.30–18.00 น.",
    description:
      "โบราณสถานสำคัญใจกลางเมืองเก่าสุโขทัย โดดเด่นด้วยเจดีย์ประธานและกลุ่มโบราณสถานโดยรอบ",
  },
  {
    id: 3,
    name: "วัดศรีชุม",
    category: "วัดและโบราณสถาน",
    rating: "4.6",
    location: "อำเภอเมืองสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=85",
    hours: "ทุกวัน 07.00–17.30 น.",
    description:
      "สถานที่ประดิษฐานพระอจนะ พระพุทธรูปองค์ใหญ่ภายในมณฑป ซึ่งเป็นหนึ่งในจุดหมายที่ไม่ควรพลาด",
  },
  {
    id: 4,
    name: "อุทยานแห่งชาติรามคำแหง",
    category: "ธรรมชาติ",
    rating: "4.5",
    location: "อำเภอคีรีมาศ",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    hours: "โปรดตรวจสอบก่อนเดินทาง",
    description:
      "พื้นที่ธรรมชาติที่เหมาะกับการเดินป่า ชมวิวภูเขา และสัมผัสอากาศบริสุทธิ์",
  },
  {
    id: 5,
    name: "ปั่นจักรยานชมเมืองเก่า",
    category: "กิจกรรม",
    rating: "4.7",
    location: "อุทยานประวัติศาสตร์สุโขทัย",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=85",
    hours: "ช่วงเช้าและเย็น",
    description:
      "กิจกรรมปั่นจักรยานชมโบราณสถานและบรรยากาศเมืองเก่าอย่างเพลิดเพลิน",
  },
  {
    id: 6,
    name: "ที่พักบรรยากาศธรรมชาติ",
    category: "ที่พัก",
    rating: "4.6",
    location: "อำเภอเมืองสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=85",
    hours: "เช็กอินตามเวลาของที่พัก",
    description:
      "ตัวอย่างที่พักสำหรับพักผ่อนหลังจากออกเดินทางท่องเที่ยวในจังหวัดสุโขทัย",
  },
  {
    id: 7,
    name: "ร้านอาหารพื้นเมืองสุโขทัย",
    category: "ร้านอาหาร",
    rating: "4.5",
    location: "อำเภอเมืองสุโขทัย",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
    hours: "โปรดตรวจสอบเวลาเปิดร้าน",
    description:
      "ค้นหาเมนูอาหารพื้นเมืองและร้านอาหารสำหรับเติมพลังระหว่างทริป",
  },
];

const categories = [
  { label: "สถานที่ท่องเที่ยว", icon: MapPin, filter: "ทั้งหมด" },
  { label: "กิจกรรม", icon: CalendarDays, filter: "กิจกรรม" },
  { label: "ที่พัก", icon: BedDouble, filter: "ที่พัก" },
  { label: "ร้านอาหาร", icon: Utensils, filter: "ร้านอาหาร" },
];

const navItems = [
  { label: "หน้าหลัก", icon: Home },
  { label: "สำรวจ", icon: Compass },
  { label: "รายการโปรด", icon: Heart },
  { label: "บัญชี", icon: UserRound },
];

export default function HomePage() {
  const [tab, setTab] = useState("หน้าหลัก");
  const [category, setCategory] = useState("ทั้งหมด");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<Place | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory =
        category === "ทั้งหมด" || place.category === category;

      const matchesSearch = place.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const visiblePlaces =
    tab === "รายการโปรด"
      ? places.filter((place) => favorites.includes(place.id))
      : filtered;

  const toggleFavorite = (id: number) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const selectCategory = (value: string) => {
    setCategory(value);
    setTab("สำรวจ");
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* HEADER */}
      <header className="topbar">
        <button className="icon-button" aria-label="เมนู">
          <Menu size={21} />
        </button>

        <div className="brand">
          <span className="brand-mark">
            <Sparkles size={15} />
          </span>
          <span>สุโขทัย</span>
        </div>

        <button
          className="icon-button notification"
          aria-label="การแจ้งเตือน"
        >
          <Bell size={20} />
          <i />
        </button>
      </header>

      {/* HOME */}
      {tab === "หน้าหลัก" && (
        <>
          <section className="hero">
            <img
              src="https://images.unsplash.com/photo-1606293926075-69a00dbpay1?auto=format&fit=crop&w=1400&q=90"
              alt="สถานที่ท่องเที่ยว"
            />

            <div className="hero-shade" />

            <div className="hero-copy">
              <span className="hero-tag">เมืองมรดกโลก</span>
              <p>ยินดีต้อนรับสู่</p>
              <h1>จังหวัดสุโขทัย</h1>
              <span className="hero-sub">
                เมืองมรดกโลก แห่งอารยธรรมไทย
              </span>

              <button
                className="hero-cta"
                onClick={() => setTab("สำรวจ")}
              >
                สำรวจเลย <ArrowRight size={16} />
              </button>
            </div>

            <div className="hero-dots">
              <i className="active" />
              <i />
              <i />
            </div>
          </section>

          <section className="category-grid">
            {categories.map(({ label, icon: Icon, filter }) => (
              <button
                className="category-tile"
                key={label}
                onClick={() => selectCategory(filter)}
              >
                <span>
                  <Icon size={22} />
                </span>
                <b>{label}</b>
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
              <p>วางแผนเส้นทางและค้นหาสถานที่ที่ใช่สำหรับคุณ</p>
            </div>
            <Compass size={36} />
          </section>
        </>
      )}

      {/* EXPLORE */}
      {tab === "สำรวจ" && (
        <>
          <div className="page-heading">
            <span className="eyebrow">DISCOVER SUKHOTHAI</span>
            <h1>ค้นพบสถานที่ใหม่</h1>
            <p>เลือกจุดหมายที่คุณอยากออกไปสัมผัส</p>
          </div>

          <div className="search-row">
            <Search size={19} />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ค้นหาสถานที่ท่องเที่ยว..."
            />

            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-label="ตัวกรอง"
            >
              <SlidersHorizontal size={19} />
            </button>
          </div>

          {showFilters && (
            <div className="filter-note">
              เลือกหมวดหมู่ด้านล่างเพื่อกรองสถานที่
            </div>
          )}

          <div className="chips">
            {["ทั้งหมด", "วัดและโบราณสถาน", "ธรรมชาติ", "กิจกรรม", "ที่พัก", "ร้านอาหาร"].map(
              (item) => (
                <button
                  key={item}
                  className={
                    category === item ? "chip selected" : "chip"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <SectionHeading
            title="สถานที่ท่องเที่ยว"
            action={`${filtered.length} แห่ง`}
          />

          <div className="place-list">
            {filtered.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                favorite={favorites.includes(place.id)}
                onFavorite={() => toggleFavorite(place.id)}
                onOpen={() => setSelected(place)}
              />
            ))}

            {filtered.length === 0 && (
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

      {/* FAVORITES */}
      {tab === "รายการโปรด" && (
        <>
          <div className="page-heading">
            <span className="eyebrow">YOUR COLLECTION</span>
            <h1>รายการโปรด</h1>
            <p>สถานที่ที่คุณบันทึกไว้สำหรับการเดินทาง</p>
          </div>

          <div className="place-list">
            {visiblePlaces.length > 0 ? (
              visiblePlaces.map((place) => (
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
                title="ยังไม่มีรายการโปรด"
                description="กดรูปหัวใจบนสถานที่ที่ชอบ เพื่อบันทึกไว้ที่นี่"
                onClick={() => setTab("สำรวจ")}
              />
            )}
          </div>
        </>
      )}

      {/* PROFILE */}
      {tab === "บัญชี" && (
        <section className="profile-view">
          <div className="profile-avatar">
            <UserRound size={38} />
          </div>

          <p className="eyebrow">ยินดีต้อนรับ</p>
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
              <b>4</b>
              <span>หมวดหมู่</span>
            </div>
          </div>

          <button
            className="outline-button"
            onClick={() => setTab("หน้าหลัก")}
          >
            กลับหน้าหลัก
          </button>
        </section>
      )}

      {/* BOTTOM NAVIGATION */}
      <nav className="bottom-nav">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className={
              tab === label ? "nav-item active" : "nav-item"
            }
            onClick={() => setTab(label)}
          >
            <Icon
              size={21}
              fill={
                tab === label && label === "รายการโปรด"
                  ? "currentColor"
                  : "none"
              }
            />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* PLACE DETAIL MODAL */}
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
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="ปิดรายละเอียด"
            >
              <X size={20} />
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
                  className="heart-button"
                  onClick={() => toggleFavorite(selected.id)}
                >
                  <Heart
                    size={21}
                    fill={
                      favorites.includes(selected.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              <div className="meta-line">
                <span>
                  <Star size={15} fill="currentColor" />
                  {selected.rating}
                </span>

                <span>
                  <MapPin size={15} />
                  {selected.location}
                </span>
              </div>

              <p>{selected.description}</p>

              <div className="info-row">
                <Clock3 size={17} />
                <span>{selected.hours}</span>
              </div>

              <div className="info-row">
                <Car size={17} />
                <span>
                  แนะนำให้ตรวจสอบเส้นทางก่อนออกเดินทาง
                </span>
              </div>

              <button
                className="primary-button full"
                onClick={() => setSelected(null)}
              >
                <Navigation size={17} />
                ดูรายละเอียดการเดินทาง
              </button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}

/* SECTION HEADING */

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
        <button onClick={onClick}>
          {action}
          <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}

/* PLACE CARD */

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
    <article
      className={compact ? "place-card compact" : "place-card"}
    >
      <button className="place-open" onClick={onOpen}>
        <img src={place.image} alt={place.name} />

        <div className="place-info">
          <h3>{place.name}</h3>

          <div className="place-meta">
            <span>
              <Star size={13} fill="currentColor" />
              {place.rating}
            </span>

            <span>
              <MapPin size={13} />
              {place.location}
            </span>
          </div>
        </div>
      </button>

      <button
        className={
          favorite ? "card-heart saved" : "card-heart"
        }
        onClick={onFavorite}
        aria-label={
          favorite ? "นำออกจากรายการโปรด" : "เพิ่มรายการโปรด"
        }
      >
        <Heart
          size={18}
          fill={favorite ? "currentColor" : "none"}
        />
      </button>
    </article>
  );
}

/* EMPTY STATE */

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
        <Heart size={30} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <button className="primary-button" onClick={onClick}>
        ไปสำรวจสถานที่
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
