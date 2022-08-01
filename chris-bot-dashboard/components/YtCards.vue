<template>
  <div>
    <Suspense>
      <Cards />
      <template #fallback>
        <AppbarSkeleton />
      </template>
    </Suspense>
  </div>
</template>
