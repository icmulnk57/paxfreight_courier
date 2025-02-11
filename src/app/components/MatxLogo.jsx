import useSettings from "app/hooks/useSettings";

export default function MatxLogo({ className }) {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <img
      src="../assets/images/logoPax.png"
      className={className}
      background-color={"ffffff"}
      style={{ width: "auto", height: "40px" }} 
      
    />
  );
}
