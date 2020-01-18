/**
 * Recupera y procesa datos de repositorio
 */

function RepoManager() {
	var REPO_URL = "./index.json"

	var _listItem = [
		'<div class="col-md-4 mb50">',
		'<div class="probootstrap-card probootstrap-person text-center">',
		'<div class="probootstrap-card-media">',
		'<img class="app-image img-responsive" src="#" alt="Imagen">',
		'</div>',
		'<div class="probootstrap-card-text">',
		'<h2 class="probootstrap-card-heading mb0 app-title">Aplicacion</h2>',
		'<p><small>Codigo Version: <span class="app-version">0</span></small></p>',
		'<p class="app-description">Cargando...</p>',
		'<a href="#" class="btn btn-block btn-outline btn-info app-btn-details">Detalles</a>',
		'</div>',
		'</div>',
		'</div>'
	].join('');

	var _getRepositoryIndex = function (cb) {
		$.getJSON(REPO_URL, function (data) {
			cb(data);
		});
	}

	this.parseRepositoryIndex = function () {
		_getRepositoryIndex(function (data) {
			var pkgs = data.packages;
			var list = $('#projects-list');
			for (var i in pkgs) {
				var item = $(_listItem);
				item.find(".app-image").attr("src", pkgs[i].images.thumbnail);
				item.find(".app-title").html(pkgs[i].name)
				item.find(".app-version").html(pkgs[i].version)
				item.find(".app-description").html(pkgs[i].description)
				item.find(".app-btn-details").attr("href", "./details.html?app=" + i)
				list.append(item);
			}
		})
	}

	this.parseRepositoryDetail = function () {
		_getRepositoryIndex(function (data) {
			var urlParams = new URLSearchParams(window.location.search);
			if (urlParams.has('app')) {
				var pkgName = urlParams.get("app");
				var pkg = data.packages[pkgName];
				if (!pkg) throw new Exception("UNKNOWN_PACKAGE");
				$(".heading").html(pkg.name);
				$(".app-description").html(pkg.description);
				$(".app-image").attr("src", pkg.images.src);
				$(".app-version").html(pkg.version);
				$(".app-btn-dwnld").attr("href", pkg.url);

				if (pkg.repoUrl) {
					$("#btns-details").addClass("has-repo");
					$(".app-btn-repo").attr("href", pkg.repoUrl);
				}

				if (!!pkg.inDev) {
					$('.dev').removeClass('hidden');
				}

				if (pkg.type) {
					var item = $(".app-btn-dwnld span");
					switch (pkg.type) {
						case 'app':
							item.text('Ver en Tienda');
							break;

						case 'web':
							item.text('Ir al sitio');
							break;

						default:
							item.text('Descargar ahora');
					}
				}
			}
		});
	}
}

window.RepoManager = new RepoManager();