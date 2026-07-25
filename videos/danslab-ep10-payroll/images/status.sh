#!/bin/bash
# What's landed, what's still open.
cd "$(dirname "$0")" || exit 1
done=0; total=0
printf "\n  EP10 — image status\n  %s\n" "$(printf '─%.0s' {1..46})"
for d in [0-9]*/; do
  d=${d%/}; total=$((total+1))
  n=$(find "$d" -maxdepth 1 -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' \) 2>/dev/null | wc -l | tr -d ' ')
  star=""; case "$d" in 04-*|06-*) star=" ★";; esac
  if [ "$n" -gt 0 ]; then
    done=$((done+1))
    pick=$(ls "$d"/PICK.* 2>/dev/null | head -1)
    [ -n "$pick" ] && tag="PICK" || tag="$n file$([ "$n" -gt 1 ] && echo s)"
    printf "  \033[32m✓\033[0m  %-18s %s%s\n" "$d" "$tag" "$star"
  else
    printf "  \033[2m·\033[0m  %-18s \033[2mopen\033[0m%s\n" "$d" "$star"
  fi
done
printf "  %s\n  %d of %d ready" "$(printf '─%.0s' {1..46})" "$done" "$total"
[ "$done" -lt "$total" ] && printf "  \033[2m— partial is fine, missing become slates\033[0m"
printf "\n\n"
