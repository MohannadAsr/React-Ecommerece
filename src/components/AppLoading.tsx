function AppLoading() {
  return (
    <div className=" h-[100vh] flex items-center justify-center app-loading">
      <div className=" flex flex-col gap-5 items-center justify-center">
        <img src="/logo.svg" alt="ladoing" className=" w-20 md:w-44" />
        <p className=" text-primary font-bold text-lg md:text-3xl">
          Loading Your App , Please Wait ...
        </p>
      </div>
    </div>
  );
}

export default AppLoading;
