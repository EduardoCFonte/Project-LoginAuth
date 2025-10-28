
from conan import ConanFile
from conan.tools.files import load
from conan.tools.cmake import CMakeToolchain, CMake, cmake_layout, CMakeDeps
import os, shutil, json

class Recipe(ConanFile):
    def __init__(self, display_name):
        super().__init__(display_name)

        # Read metadata from file
        package_json = json.loads(load(self, os.path.join(self.recipe_folder, "package.json")))

        self.CMAKE_PROJECT_NAME = package_json['name']
        self.name = self.CMAKE_PROJECT_NAME.lower()

        self.version = package_json['version']
        self.description = package_json['description']

    # Binary configuration
    package_type = "application"
    settings = "os", "compiler", "build_type", "arch"

    # Recipe options
    options = { "rebuild": [True, False] }
    default_options = { "rebuild": False}

    # Sources are located in the same place as this recipe, copy them to the recipe
    exports = "package.json"
    exports_sources = "package.json", "CMakeLists.txt", "src/*", "include/*", "resources/*"

    def requirements(self):



    def generate(self):
        # Import dependencies 
        deps = CMakeDeps(self)
        deps.generate()

        # Generate toolchain with conan configurations for VS
        tc = CMakeToolchain(self)

        # Do not generate user presets due to unsupported schema in VS2019
        tc.user_presets_path = None 

        # Support older versions of the JSON schema
        tc.cache_variables["CMAKE_TOOLCHAIN_FILE"] = os.path.join(self.generators_folder, tc.filename)
        tc.cache_variables["CMAKE_INSTALL_PREFIX"] = None

        # Generate the CMake
        tc.generate()

        # Link the generated presets to the root
        presets_gen = os.path.join(self.generators_folder, "CMakePresets.json")
        presets_usr = os.path.join(self.source_folder, "CMakeUserPresets.json")

        shutil.copyfile(src=presets_gen, dst=presets_usr)

    def layout(self):
        cmake_layout(self)

    def build(self):
        cmake = CMake(self)
        cmake.configure()

        build_args = []
        if self.options.rebuild:
            build_args.append('--clean-first')

        cmake.build(cli_args=build_args)

    def package(self):
        cmake = CMake(self)
        cmake.install()

    def package_info(self):
        #suffix = "{}_Win{}".format(self.settings.build_type, ("32" if self.settings.arch == "x86" else "64"))
        self.cpp_info.libs = [self.CMAKE_PROJECT_NAME]
        self.cpp_info.includedirs = ["include"]
        self.cpp_info.libdirs = ["lib"]
        self.cpp_info.bindirs = ["bin"]
