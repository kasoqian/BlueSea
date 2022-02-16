const TabItemMap = {
  Search: {
    key: "Search",
    Component: Search,
  },
  Material: {
    key: "Material",
    Component: Material,
  },
  Setting: {
    key: "Setting",
    Component: Setting,
  },
};

const App = () => {
  const [tabKey, setTableKey] = useState(
    TabItemMap.Material.key,
  );

  const menus = [
    {
      label: "查词",
      key: TabItemMap.Search.key,
      icon: "https://www.svgrepo.com/show/343316/translate.svg",
    },
    {
      label: "词库",
      key: TabItemMap.Material.key,
      icon: "https://www.svgrepo.com/show/309519/dictionary.svg",
    },
    {
      label: "配置",
      key: TabItemMap.Setting.key,
      icon: "https://www.svgrepo.com/show/383217/education-book-cog-config.svg",
    },
  ];

  return html`
    <div
      style=${{
        fontSize: 12,
        width: 330,
        background: "#f1f1f1",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style="height: 400px">
        <${TabItemMap[tabKey].Component} />
      </div>
      <div
        style=${{
          borderTop: "1px solid #f1f1f1",
          background: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        ${menus.map((it, index) => {
          const fontWeight =
            it.key === tabKey ? "800" : "200";
          return html`
            <div
              style="flex: 1; padding: 8px; cursor: pointer; text-align: center; font-weight: ${fontWeight}"
              onClick=${() => {
                setTableKey(it.key);
              }}
            >
              <img
                style="width:20px;height:20px"
                src="${it.icon}"
              />
              <p>${it.label}</p>
            </div>
          `;
        })}
      </div>
    </div>
  `;
};

render(html`<${App} />`, document.body);
