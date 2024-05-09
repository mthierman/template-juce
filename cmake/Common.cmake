add_library(
    jwv_features
    INTERFACE
)

add_library(
    jwv::features
    ALIAS
    jwv_features
)

target_compile_features(
    jwv_features
    INTERFACE c_std_17
              cxx_std_23
)

add_library(
    jwv_definitions
    INTERFACE
)

add_library(
    jwv::definitions
    ALIAS
    jwv_definitions
)

target_compile_definitions(
    jwv_definitions
    INTERFACE _SILENCE_CXX23_ALIGNED_STORAGE_DEPRECATION_WARNING
)
