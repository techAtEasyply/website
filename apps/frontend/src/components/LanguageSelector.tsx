import { LANGUAGE_VERSIONS } from "../constants/languages";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="language-select" className="font-medium text-gray-200">
        Language:
      </label>
      <select
        id="language-select"
        value={language}
        onChange={e => onSelect(e.target.value)}
        className="px-3 py-2 rounded-md border border-gray-700 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
      >
        {languages.map(([lang, version]) => (
          <option key={lang} value={lang} className="bg-gray-800 text-gray-100">
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
         
          </option>
        ))}
      </select>
      <span className="ml-2 text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
        {LANGUAGE_VERSIONS[language]}
      </span>
    </div>
  );
};

export default LanguageSelector;
