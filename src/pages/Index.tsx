import { useState } from "react";
import Icon from "@/components/ui/icon";

const SHOP_ITEMS = [
  {
    id: 1,
    category: "items",
    name: "Алмазный меч",
    desc: "Наносит +50% урона",
    price: 149,
    rarity: "legendary",
    icon: "⚔️",
  },
  {
    id: 2,
    category: "items",
    name: "Зелье скорости",
    desc: "Ускорение на 24 часа",
    price: 49,
    rarity: "rare",
    icon: "🧪",
  },
  {
    id: 3,
    category: "items",
    name: "Зачарованный лук",
    desc: "Дальность стрельбы ×2",
    price: 99,
    rarity: "epic",
    icon: "🏹",
  },
  {
    id: 4,
    category: "items",
    name: "Кирка неразрушимого",
    desc: "Не ломается никогда",
    price: 199,
    rarity: "legendary",
    icon: "⛏️",
  },
  {
    id: 5,
    category: "skins",
    name: "Скин Дракона",
    desc: "Эксклюзивный образ",
    price: 299,
    rarity: "legendary",
    icon: "🐉",
  },
  {
    id: 6,
    category: "skins",
    name: "Скин Ниндзя",
    desc: "Тёмный воин теней",
    price: 149,
    rarity: "epic",
    icon: "🥷",
  },
  {
    id: 7,
    category: "skins",
    name: "Скин Пирата",
    desc: "Морской разбойник",
    price: 99,
    rarity: "rare",
    icon: "🏴‍☠️",
  },
  {
    id: 8,
    category: "skins",
    name: "Скин Рыцаря",
    desc: "Сверкающие доспехи",
    price: 199,
    rarity: "legendary",
    icon: "🛡️",
  },
  {
    id: 9,
    category: "upgrades",
    name: "VIP статус",
    desc: "Привилегии на 30 дней",
    price: 399,
    rarity: "legendary",
    icon: "👑",
  },
  {
    id: 10,
    category: "upgrades",
    name: "Полёт",
    desc: "Режим полёта на сервере",
    price: 249,
    rarity: "epic",
    icon: "🚀",
  },
  {
    id: 11,
    category: "upgrades",
    name: "Удвоение опыта",
    desc: "×2 опыт на 7 дней",
    price: 149,
    rarity: "rare",
    icon: "⭐",
  },
  {
    id: 12,
    category: "upgrades",
    name: "Телепортация",
    desc: "TP к игрокам без кулдауна",
    price: 199,
    rarity: "epic",
    icon: "🌀",
  },
];

const RARITY_STYLES: Record<string, { border: string; glow: string; label: string; labelColor: string }> = {
  legendary: {
    border: "border-[#FFAA00]",
    glow: "shadow-[0_0_12px_rgba(255,170,0,0.4)]",
    label: "ЛЕГЕНДАРНЫЙ",
    labelColor: "text-[#FFAA00]",
  },
  epic: {
    border: "border-[#bf5fff]",
    glow: "shadow-[0_0_12px_rgba(191,95,255,0.4)]",
    label: "ЭПИЧЕСКИЙ",
    labelColor: "text-[#bf5fff]",
  },
  rare: {
    border: "border-[#4ADEDE]",
    glow: "shadow-[0_0_12px_rgba(74,222,222,0.3)]",
    label: "РЕДКИЙ",
    labelColor: "text-[#4ADEDE]",
  },
};

const CATEGORIES = [
  { key: "all", label: "Всё", icon: "🗂️" },
  { key: "items", label: "Предметы", icon: "⚔️" },
  { key: "skins", label: "Скины", icon: "🎭" },
  { key: "upgrades", label: "Улучшения", icon: "⚡" },
];

export default function Index() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [nick, setNick] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [purchased, setPurchased] = useState<number[]>([]);

  const filteredItems =
    activeCategory === "all"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((i) => i.category === activeCategory);

  const cartItems = SHOP_ITEMS.filter((i) => cart.includes(i.id));
  const totalPrice = cartItems.reduce((s, i) => s + i.price, 0);

  function handleLogin() {
    if (nick.trim().length < 2) return;
    setPlayerName(nick.trim());
    setLoggedIn(true);
    setLoginOpen(false);
    setNick("");
  }

  function addToCart(id: number) {
    if (!cart.includes(id)) setCart((c) => [...c, id]);
  }

  function removeFromCart(id: number) {
    setCart((c) => c.filter((x) => x !== id));
  }

  function handleBuy() {
    setPurchased((p) => [...p, ...cart]);
    setCart([]);
    setCartOpen(false);
  }

  return (
    <div className="min-h-screen bg-mine-darker stone-pattern text-white font-rubik overflow-x-hidden">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-mine-dark/95 border-b-2 border-mine-green backdrop-blur pixel-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⛏️</span>
            <span className="font-pixel text-mine-green text-xs sm:text-sm leading-tight">
              MINE<span className="text-mine-gold">DONATE</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {loggedIn && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-1 px-3 py-2 bg-mine-panel border border-mine-stone text-sm pixel-border hover:border-mine-gold transition-colors"
              >
                <span>🛒</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-mine-redstone text-white text-xs font-pixel w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            )}

            {loggedIn ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-mine-panel border border-mine-green pixel-border">
                <span className="text-lg">🎮</span>
                <span className="font-pixel text-mine-green text-xs">{playerName}</span>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="px-4 py-2 bg-mine-green text-white font-pixel text-xs pixel-border-green hover:bg-mine-green-light transition-colors active:translate-y-1"
              >
                ВОЙТИ
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/3402a1ad-9b0e-43e5-83ec-cabfaac442d4/files/0696c1e9-652f-4abc-ad36-c29f385e8bd1.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mine-darker/60 via-transparent to-mine-darker" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32 text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-mine-green/20 border border-mine-green font-pixel text-mine-green text-xs animate-blink">
            ● СЕРВЕР ОНЛАЙН
          </div>

          <h1 className="font-pixel text-2xl sm:text-4xl md:text-5xl leading-snug mb-6 animate-slide-up">
            <span className="text-white">MINECRAFT</span>
            <br />
            <span className="text-mine-gold">DONATE</span>
            <span className="text-mine-green"> SHOP</span>
          </h1>

          <p className="text-mine-stone text-base sm:text-lg max-w-xl mx-auto mb-10 animate-fade-in">
            Прокачай своего персонажа! Уникальные предметы, скины и привилегии для лучшего опыта на сервере.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            {!loggedIn ? (
              <button
                onClick={() => setLoginOpen(true)}
                className="px-8 py-4 bg-mine-green font-pixel text-sm text-white pixel-border-green hover:bg-mine-green-light transition-all active:translate-y-1 shadow-[0_0_20px_rgba(91,173,60,0.4)]"
              >
                🎮 ВОЙТИ В МАГАЗИН
              </button>
            ) : (
              <button
                onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-mine-green font-pixel text-sm text-white pixel-border-green hover:bg-mine-green-light transition-all active:translate-y-1 shadow-[0_0_20px_rgba(91,173,60,0.4)]"
              >
                ⚔️ В МАГАЗИН
              </button>
            )}
            <button
              onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-mine-panel border-2 border-mine-gold font-pixel text-sm text-mine-gold pixel-border-gold hover:bg-mine-gold/10 transition-all active:translate-y-1"
            >
              👑 СМОТРЕТЬ ТОВАРЫ
            </button>
          </div>
        </div>

        {/* Pixel blocks decoration */}
        <div className="flex justify-center gap-0 overflow-hidden h-8">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 flex-shrink-0"
              style={{
                background: i % 3 === 0 ? "#5BAD3C" : i % 3 === 1 ? "#3E7A29" : "#8B6340",
                boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.3), inset 2px 2px 0 rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-mine-dark border-y border-mine-stone/30">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { icon: "👥", value: "1,247", label: "Игроков онлайн" },
            { icon: "🛒", value: "3,891", label: "Покупок сегодня" },
            { icon: "⭐", value: "4.9", label: "Рейтинг сервера" },
            { icon: "🎁", value: "128", label: "Уникальных товаров" },
          ].map((stat, i) => (
            <div key={i} className="p-4 bg-mine-panel pixel-border">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-pixel text-mine-gold text-lg">{stat.value}</div>
              <div className="text-mine-stone text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-pixel text-xl sm:text-2xl text-mine-gold mb-3">⚔️ МАГАЗИН ДОНАТОВ</h2>
          <p className="text-mine-stone">Выбери что-нибудь для своего приключения</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 font-pixel text-xs transition-all pixel-border ${
                activeCategory === cat.key
                  ? "bg-mine-green text-white border-mine-green pixel-border-green"
                  : "bg-mine-panel text-mine-stone border border-mine-stone/50 hover:border-mine-green hover:text-white"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const r = RARITY_STYLES[item.rarity];
            const inCart = cart.includes(item.id);
            const isBought = purchased.includes(item.id);
            return (
              <div
                key={item.id}
                className={`relative bg-mine-panel border-2 ${r.border} ${r.glow} p-4 flex flex-col gap-3 transition-transform hover:-translate-y-1`}
              >
                <div className={`font-pixel text-[9px] ${r.labelColor}`}>{r.label}</div>
                <div className="text-5xl text-center py-2">{item.icon}</div>
                <div>
                  <div className="font-pixel text-xs text-white mb-1">{item.name}</div>
                  <div className="text-mine-stone text-xs">{item.desc}</div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-pixel text-mine-gold text-sm">{item.price} ₽</span>
                  {isBought ? (
                    <span className="font-pixel text-xs text-mine-green px-2 py-1 border border-mine-green">✓ КУПЛЕНО</span>
                  ) : (
                    <button
                      onClick={() => {
                        if (!loggedIn) { setLoginOpen(true); return; }
                        addToCart(item.id);
                      }}
                      className={`font-pixel text-xs px-3 py-1 transition-all active:translate-y-px ${
                        inCart
                          ? "bg-mine-panel border border-mine-stone text-mine-stone cursor-default"
                          : "bg-mine-green text-white pixel-border-green hover:bg-mine-green-light"
                      }`}
                    >
                      {inCart ? "В КОРЗИНЕ" : "КУПИТЬ"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-mine-dark border-t border-mine-stone/20">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-pixel text-xl text-center text-white mb-10">🏆 ПОЧЕМУ МЫ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "⚡", title: "Мгновенная выдача", desc: "Товары появляются в игре сразу после оплаты. Никаких ожиданий." },
              { icon: "🔒", title: "Безопасная оплата", desc: "Защищённые платёжные системы. Ваши данные в безопасности." },
              { icon: "🎮", title: "Поддержка 24/7", desc: "Наши администраторы всегда помогут решить любой вопрос." },
            ].map((f, i) => (
              <div key={i} className="p-6 bg-mine-panel pixel-border text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <div className="font-pixel text-sm text-mine-gold mb-2">{f.title}</div>
                <div className="text-mine-stone text-sm">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKINS PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-pixel text-lg text-mine-gold mb-4">🎭 СКИНЫ И ПРЕДМЕТЫ</h2>
            <p className="text-mine-stone mb-4 leading-relaxed">
              Сотни уникальных скинов и предметов для настройки твоего персонажа. Выделяйся среди других игроков!
            </p>
            <div className="flex flex-wrap gap-2">
              {["Эксклюзивные", "Анимированные", "Сезонные", "Редкие"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-mine-panel border border-mine-diamond text-mine-diamond font-pixel text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden pixel-border border-2 border-mine-stone/40">
            <img
              src="https://cdn.poehali.dev/projects/3402a1ad-9b0e-43e5-83ec-cabfaac442d4/files/a8aebb96-a3bc-483f-84ae-8c6440d70c72.jpg"
              alt="Скины"
              className="w-full object-cover opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-mine-dark border-t-2 border-mine-stone/30">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="font-pixel text-mine-green text-sm mb-2">MINE<span className="text-mine-gold">DONATE</span></div>
          <div className="text-mine-stone text-xs">© 2024 MineDonate. Все права защищены.</div>
          <div className="flex justify-center gap-4 mt-4">
            {["⛏️", "🌿", "💎", "🔥"].map((b, i) => (
              <div key={i} className="w-8 h-8 bg-mine-panel pixel-border flex items-center justify-center text-sm">
                {b}
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      {loginOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setLoginOpen(false)}
        >
          <div className="bg-mine-dark border-2 border-mine-green pixel-border w-full max-w-sm p-6 animate-slide-up shadow-[0_0_40px_rgba(91,173,60,0.3)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-pixel text-mine-green text-sm">🎮 ВХОД В МАГАЗИН</h2>
              <button
                onClick={() => setLoginOpen(false)}
                className="text-mine-stone hover:text-white font-pixel text-xs px-2 py-1 border border-mine-stone/50 hover:border-mine-redstone transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <label className="font-pixel text-xs text-mine-stone block mb-2">НИКНЕЙМ ИГРОКА</label>
              <input
                type="text"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Steve123..."
                className="w-full bg-mine-panel border-2 border-mine-stone/50 focus:border-mine-green outline-none px-3 py-3 text-white font-pixel text-xs placeholder:text-mine-stone/50 transition-colors"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={nick.trim().length < 2}
              className="w-full py-3 bg-mine-green text-white font-pixel text-xs pixel-border-green hover:bg-mine-green-light disabled:opacity-40 disabled:cursor-not-allowed transition-all active:translate-y-px"
            >
              ⚔️ ВОЙТИ И ИГРАТЬ
            </button>

            <p className="text-mine-stone/60 text-xs text-center mt-4">
              Введи никнейм с сервера для привязки покупок
            </p>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setCartOpen(false)}
        >
          <div className="bg-mine-dark border-2 border-mine-gold pixel-border w-full max-w-md p-6 animate-slide-up shadow-[0_0_40px_rgba(255,170,0,0.2)] max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-pixel text-mine-gold text-sm">🛒 КОРЗИНА</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-mine-stone hover:text-white font-pixel text-xs px-2 py-1 border border-mine-stone/50 hover:border-mine-redstone transition-colors"
              >
                ✕
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-mine-stone font-pixel text-xs">КОРЗИНА ПУСТА</div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-mine-panel px-3 py-2 pixel-border">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-pixel text-xs text-white">{item.name}</div>
                        <div className="text-mine-stone text-xs">{item.price} ₽</div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-mine-stone hover:text-mine-redstone font-pixel text-xs transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-mine-stone/30 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-pixel text-xs text-mine-stone">ИТОГО:</span>
                    <span className="font-pixel text-mine-gold text-lg">{totalPrice} ₽</span>
                  </div>
                  <button
                    onClick={handleBuy}
                    className="w-full py-3 bg-mine-gold text-mine-darker font-pixel text-xs pixel-border-gold hover:brightness-110 transition-all active:translate-y-px"
                  >
                    💳 ОПЛАТИТЬ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
