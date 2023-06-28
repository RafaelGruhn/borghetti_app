# pylint: disable=too-many-return-statements,too-many-branches,too-many-locals
from rest_framework import permissions


class AllowViewUser(permissions.BasePermission):
    def correct_permission(self, user, view):
        """check if user has correct permission"""
        if view.action in ('list', 'retrieve'):
            return True
        if view.action == 'create':
            if user.is_superuser:
                return True
        if view.action in ('update', 'partial_update'):
            if user.is_superuser:
                return True
        if view.action == 'destroy':
            if user.is_superuser:
                return True
        return False

    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        return self.correct_permission(request.user, view)

    def has_object_permission(self, request, view, obj):
        if request.user.is_anonymous:
            return False
        elif request.user.is_superuser:
            return True
        return False
