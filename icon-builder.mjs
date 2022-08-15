import * as fs from 'fs';
import * as path from 'path';
import * as virtuous from '@kary/virtuous';

// ─── Lists ──────────────────────────────────────────────────────────────────────

const byLanguageIds = {
    document: [
        'latex', 'markdown', 'pageman', 'tex', 'txt',
    ],
    data: [
        'json', 'jsonc', 'ini', 'xml', 'xsl', 'yaml', 'toml'
    ]
}

const byFileName = {
    document: [
        'LICENSE',
        'CHANGELOG',
        'README',
    ],

    configuration: [
        // Node
        'package.json', '.npmignore',
        // GNU Make
        'Makefile',
        // Dart and Flutter Pub
        'pubspec.yaml',
        // TypeScript
        'tsconfig.json',
        // Webpack
        'webpack.js',
        // KaryScript
        'k.yml',
        // Rust
        'cargo.toml',
        // Haskell
        'stack.yml',
        // Git
        '.gitignore',
        // CocoaPods
        'Podfile',
        // GitHub
        'CNAME',
        // Travis CI
        '.travis.yml',
        // Gulp
        'gulpfile.js',
        // vscode
        '.vscodeignore'
        // cmake
    ],

    data: [
        // Flutter
        '.flutter-plugins',
        '.flutter-plugins-dependencies', '.packages', '.metadata',
        // VSCE (vscode)
        '.vsixmanifest',
        // Node
        'package-lock.json',
        // CMake
        'CMakeLists.txt'
    ]
}

const byFileExtensions = {
    asset: [
        // images
        'png', 'jpeg', 'jpg', 'tiff', 'gif', 'webp', 'heic', 'cam', 'bmp', 'raw', 'thumb', 'exr',
        'tn3', 'g3p', 'bitmap', 'rgba',

        // fonts
        'ttf', 'otf', 'woff', 'woff2', 'pkt', 'eot', 'ofm', 'glyphs', 'suit',

        // documents
        'pdf', 'docx', 'pages', 'doc', 'pptx', 'keynote', 'ppt', 'xlc', 'xlcx', 'numbers',

        // icons
        'ico', 'icns', 'icon',

        // graphics
        'sketch', 'eps', 'psd', 'ax3', 'gplt', 'cv4', 'oci', 'ggr', 'qti', 'vstm', 'std', 'psq',
        'rad', 'nitf', 'pcj', 'pdb', 'm3d', 'cmtx', 'r8', 'cs8', 'cps', 'inline', 'smil', 'qtif',
        'aegraphic', 'des', 'qif', 'ogg', 'kfa', 'psi', 'vec', 'ai', 'fla', 'afdesign', 'pic',
        'abr', 'djvu',

        // video
        'webm', 'apng',

        // audio
        'mp3', 'wav',

        // ebook
        'epub', 'mobi', 'cbr', 'htmlz', 'azw',  'azw1', 'azw2', 'azw3', 'azw4', 'azw5', 'azw6',
        'azw7', 'azw8', 'azw9', 'azw10', 'azw11', 'azw12', 'azw13',

        // compressed files
        'rar', 'zip', 'gzip', '7z', 'pkg', 'dmg', 'asar', 'asec', 'jar', 'ipa', 'apx', 'deb',
        'zlib', 'msu', 'lz4', 'rpm',

        // binary
        'exe',

        // databases
        'sqlite', 'gdb', 'cdb', 'sdb',
    ],

    document: [
        'md', 'markdown', 'html',
        'txt', 'ascii', 'midi',
    ],

    data: [
        'csv', 'tsv',
        'tmLanguage', 'tmTheme',
        'lock', 'manifest',
        'entitlements',
    ],

    configuration: [
        'sh', 'shell', 'bsh', 'bash',
        'plist', 'xcconfig',
        'properties', 'mf', 'localstorage',
        'dockerfile',
        'aux',
        'lut',
        'container',
        'gradle',
        'cabal',
        'cmake',
    ]
}

// ─── Dictionary To Json ─────────────────────────────────────────────────────────

function mapDictionaryToJSON(dictionary, appearance) {
    function sortAndPurifyTheList(list) {
        const removedDuplicates = Array.from(new Set(list))
        const sorted            = removedDuplicates.sort()
        return sorted
    }

    let results = {};
    for (const key of Object.keys(dictionary)) {
        for (const value of sortAndPurifyTheList(dictionary[key])) {
            results[value] = `_${key}_file_${appearance}`;
        }
    }
    return results
}

// ─── Main Json Generator ────────────────────────────────────────────────────────

function generateIconManifestJSON() {
    return JSON.stringify({
        file:               "code_file_dark",
        folder:             "_folder_dark",
        folderExpanded:     "_folder_expanded_dark",
        fileExtensions:     mapDictionaryToJSON(byFileExtensions,   'dark'),
        languageIds:        mapDictionaryToJSON(byLanguageIds,      'dark'),
        fileNames:          mapDictionaryToJSON(byFileName,         'dark'),

        light: {
            file:               "code_file_light",
            folder:             "_folder_light",
            folderExpanded:     "_folder_expanded_light",
            fileExtensions:     mapDictionaryToJSON(byFileExtensions,  'light'),
            languageIds:        mapDictionaryToJSON(byLanguageIds,     'light'),
            fileNames:          mapDictionaryToJSON(byFileName,        'light'),
        },

        iconDefinitions: {
            _folder_light: {
                iconPath:    "./assets/folder-light.svg"
            },
            _folder_dark: {
                iconPath:    "./assets/folder-dark.svg"
            },
            _folder_expanded_light: {
                iconPath:    "./assets/folder-expanded-light.svg"
            },
            _folder_expanded_dark: {
                iconPath:    "./assets/folder-expanded-dark.svg"
            },
            code_file_light: {
                iconPath:    "./assets/code-file-light.svg"
            },
            code_file_dark: {
                iconPath:    "./assets/code-file-dark.svg"
            },
            _asset_file_light: {
                iconPath:    "./assets/asset-file-light.svg"
            },
            _asset_file_dark: {
                iconPath:    "./assets/asset-file-dark.svg"
            },
            _configuration_file_light: {
                iconPath:    "./assets/configuration-file-light.svg"
            },
            _configuration_file_dark: {
                iconPath:    "./assets/configuration-file-dark.svg"
            },
            _document_file_light: {
                iconPath:    "./assets/document-file-light.svg"
            },
            _document_file_dark: {
                iconPath:    "./assets/document-file-dark.svg"
            },
            _data_file_light: {
                iconPath:    "./assets/data-file-light.svg"
            },
            _data_file_dark: {
                iconPath:    "./assets/data-file-dark.svg"
            },
        }
    });
}

// ─── Main Part ──────────────────────────────────────────────────────────────────

main(); function main() {
    const pathToIconManifest =
        path.join(process.cwd(), "icons", "icons-pro-colors.json");
    const generatedJSON =
        generateIconManifestJSON();
    const formatted =
        virtuous.format(generatedJSON).value
    fs.writeFileSync(pathToIconManifest, formatted);
}