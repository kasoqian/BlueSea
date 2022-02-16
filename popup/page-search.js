function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    } else {
      timer = setTimeout(fn, delay);
    }
  };
}

const Search = () => {
  const [text, setText] = useState("");
  const [material, setMaterial] = useState(null);

  let [options, setOptions] = useState([]);

  let getResult = async words => {
    let resData = await fetch(
      `https://service-pnrys8g3-1254074572.bj.apigw.tencentcs.com/release?text=${words}`,
    ).then(raw => raw.json());
    setOptions(resData.content.basic.explains);
  };

  let getResultPower = words =>
    debounce(getResult(words), 2000);

  return html`
    <div
      style="height: 400px; overflow-y: auto; box-sizing: border-box;"
    >
      <div>
        <input
          class="search-input"
          placeholder="查词"
          value=${text}
          onInput=${e => {
            setText(e.target.value);
            setMaterial(null);
            getResultPower(e.target.value);
          }}
        />
      </div>
      ${options.length === 0
        ? html`<h1
            style="line-height: 200px;text-align: center;width: 100%;color: grey;font-weight: 300;"
          >
            请输入查询词
          </h1>`
        : ""}
      ${options.map(
        it =>
          html`<div
            class="search-item"
            style="background: #fff;font-weight: 400;border-radius: 5px;margin: 10px;padding: 5px 30px;font-size: 14px;"
          >
            ${it}
          </div>`,
      )}
      ${!material &&
      html`
        <div
          style="
        background: #fff;
        width: 260px;
        margin: 0 auto;
        margin-top: 16px;
        border-radius: 4px;"
        ></div>
      `}
      ${material &&
      html`<div
        style="
        width: 260px;
        margin: 0 auto;
        margin-top: 16px;
        min-height: 100px;
        border-radius: 4px;
        background: #fff;"
      >
        <${TfCard} tfData=${material.youdao} />
      </div>`}
    </div>
  `;
};

//  ${getResult.map(
//     it =>
//       html`<div class="search-item">${it}: ${it}</div>`,
//   )}
