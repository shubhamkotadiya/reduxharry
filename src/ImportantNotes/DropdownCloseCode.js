useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileRef]);
